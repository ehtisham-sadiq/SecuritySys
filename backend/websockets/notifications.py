from fastapi import WebSocket, WebSocketDisconnect, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict, List, Any
import json
import asyncio
from datetime import datetime, timedelta

from backend.database import get_db
from backend.auth import decode_token
from backend.models import User, Notification

class NotificationManager:
    def __init__(self):
        self.active_connections: Dict[int, List[WebSocket]] = {}
        self.background_task = None
    
    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        if user_id not in self.active_connections:
            self.active_connections[user_id] = []
        self.active_connections[user_id].append(websocket)
        
        # Start background task if not already running
        if self.background_task is None:
            self.background_task = asyncio.create_task(self.check_for_new_notifications())
    
    def disconnect(self, websocket: WebSocket, user_id: int):
        if user_id in self.active_connections:
            self.active_connections[user_id].remove(websocket)
            if not self.active_connections[user_id]:
                del self.active_connections[user_id]
    
    async def send_notification(self, user_id: int, message: Dict[str, Any]):
        if user_id in self.active_connections:
            for connection in self.active_connections[user_id]:
                await connection.send_text(json.dumps(message))
    
    async def broadcast(self, message: Dict[str, Any]):
        for user_id in self.active_connections:
            await self.send_notification(user_id, message)
    
    async def check_for_new_notifications(self):
        """Background task to check for new notifications in the database"""
        while True:
            try:
                # Sleep first to avoid immediate checking
                await asyncio.sleep(10)  # Check every 10 seconds
                
                # Skip if no active connections
                if not self.active_connections:
                    continue
                
                # Get database session
                db = next(get_db())
                
                # Check for new notifications for each connected user
                for user_id in self.active_connections:
                    # Get unread notifications created in the last minute
                    one_minute_ago = datetime.now() - timedelta(minutes=1)
                    new_notifications = db.query(Notification).filter(
                        Notification.user_id == user_id,
                        Notification.is_read == False,
                        Notification.created_at >= one_minute_ago
                    ).all()
                    
                    # Send each new notification
                    for notification in new_notifications:
                        await self.send_notification(user_id, {
                            "type": "new_notification",
                            "notification": {
                                "id": notification.id,
                                "title": notification.title,
                                "message": notification.message,
                                "type": notification.type,
                                "created_at": notification.created_at.isoformat()
                            }
                        })
            
            except Exception as e:
                print(f"Error in notification background task: {e}")
                # Don't let the task die on error
                await asyncio.sleep(30)  # Wait longer on error

# Create global notification manager
notification_manager = NotificationManager()

async def get_user_from_token(websocket: WebSocket):
    """Extract and validate user from token in websocket query params"""
    try:
        token = websocket.query_params.get("token")
        if not token:
            await websocket.close(code=1008, reason="Missing authentication token")
            return None
        
        payload = decode_token(token)
        if not payload or "user_id" not in payload:
            await websocket.close(code=1008, reason="Invalid authentication token")
            return None
        
        return payload["user_id"]
    
    except Exception as e:
        await websocket.close(code=1008, reason=f"Authentication error: {str(e)}")
        return None

async def websocket_endpoint(websocket: WebSocket):
    user_id = await get_user_from_token(websocket)
    if not user_id:
        return
    
    try:
        await notification_manager.connect(websocket, user_id)
        
        # Send initial message
        await websocket.send_text(json.dumps({
            "type": "connection_established",
            "message": "Connected to notification service"
        }))
        
        # Keep the connection alive
        while True:
            data = await websocket.receive_text()
            # Process any client messages if needed
            
    except WebSocketDisconnect:
        notification_manager.disconnect(websocket, user_id)

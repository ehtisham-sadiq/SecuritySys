from fastapi import FastAPI, Depends, HTTPException, status, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os

from backend.database import get_db, engine
from backend import models
from backend.auth import get_current_user, create_access_token, authenticate_user
from backend.routes import document_routes
from backend.websockets.notifications import websocket_endpoint
from backend.services.shift_assignment import ShiftAssignmentAlgorithm

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(title="Security Management System API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(document_routes.router)

# WebSocket endpoint for real-time notifications
app.websocket("/ws/notifications")(websocket_endpoint)

# Shift assignment endpoint
@app.post("/api/shifts/auto-assign")
async def auto_assign_shifts(
    shift_ids: list[int],
    location_priority: float = 0.4,
    certification_priority: float = 0.3,
    performance_priority: float = 0.3,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check if user has permission
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to auto-assign shifts"
        )
    
    # Create shift assignment algorithm
    algorithm = ShiftAssignmentAlgorithm(db)
    
    # Run the algorithm
    assigned_shifts = algorithm.auto_assign_shifts(
        shift_ids=shift_ids,
        location_priority=location_priority,
        certification_priority=certification_priority,
        performance_priority=performance_priority
    )
    
    return {"assigned_shifts": len(assigned_shifts), "shifts": assigned_shifts}

# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

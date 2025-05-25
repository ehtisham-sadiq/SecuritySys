from sqlalchemy.orm import Session
from typing import List, Optional
import models
import schemas

def get_notification(db: Session, notification_id: int):
    return db.query(models.Notification).filter(models.Notification.id == notification_id).first()

def get_notifications(
    db: Session, 
    user_id: int,
    skip: int = 0, 
    limit: int = 100, 
    unread_only: bool = False
):
    query = db.query(models.Notification).filter(models.Notification.user_id == user_id)
    
    if unread_only:
        query = query.filter(models.Notification.is_read == False)
    
    # Order by creation date (newest first)
    query = query.order_by(models.Notification.created_at.desc())
    
    return query.offset(skip).limit(limit).all()

def create_notification(db: Session, notification: schemas.NotificationCreate):
    db_notification = models.Notification(
        user_id=notification.user_id,
        title=notification.title,
        message=notification.message,
        type=notification.type,
        reference_id=notification.reference_id
    )
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification

def mark_as_read(db: Session, notification_id: int):
    db_notification = db.query(models.Notification).filter(models.Notification.id == notification_id).first()
    if not db_notification:
        return None
    
    db_notification.is_read = True
    db.commit()
    db.refresh(db_notification)
    return db_notification

def mark_all_as_read(db: Session, user_id: int):
    result = db.query(models.Notification).filter(
        models.Notification.user_id == user_id,
        models.Notification.is_read == False
    ).update({"is_read": True})
    
    db.commit()
    return result

def get_unread_count(db: Session, user_id: int):
    return db.query(models.Notification).filter(
        models.Notification.user_id == user_id,
        models.Notification.is_read == False
    ).count()

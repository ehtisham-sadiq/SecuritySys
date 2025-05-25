from sqlalchemy.orm import Session
from typing import List, Optional
import models
import schemas
from datetime import datetime, timedelta

def get_document(db: Session, document_id: int):
    return db.query(models.Document).filter(models.Document.id == document_id).first()

def get_documents(
    db: Session, 
    skip: int = 0, 
    limit: int = 100, 
    employee_id: Optional[int] = None,
    status: Optional[str] = None,
    document_type: Optional[str] = None
):
    query = db.query(models.Document)
    
    if employee_id:
        query = query.filter(models.Document.employee_id == employee_id)
    
    if status:
        query = query.filter(models.Document.status == status)
    
    if document_type:
        query = query.filter(models.Document.document_type == document_type)
    
    return query.offset(skip).limit(limit).all()

def create_document(db: Session, document: schemas.DocumentCreate):
    db_document = models.Document(
        employee_id=document.employee_id,
        document_type=document.document_type,
        file_path=document.file_path,
        expiry_date=document.expiry_date,
        status=document.status,
        notes=document.notes
    )
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

def update_document_status(db: Session, document_id: int, status: str, notes: Optional[str] = None):
    db_document = db.query(models.Document).filter(models.Document.id == document_id).first()
    if not db_document:
        return None
    
    db_document.status = status
    if notes:
        db_document.notes = notes
    
    db.commit()
    db.refresh(db_document)
    return db_document

def get_expiring_documents(db: Session, days: int = 30):
    """Get documents that will expire within the specified number of days"""
    expiry_date = datetime.now() + timedelta(days=days)
    return db.query(models.Document).filter(
        models.Document.expiry_date <= expiry_date,
        models.Document.expiry_date >= datetime.now(),
        models.Document.status == "Approved"
    ).all()

def get_employee_document_status(db: Session, employee_id: int):
    """
    Determine an employee's document status:
    - Complete: All required documents are approved and not expired
    - Expiring Soon: At least one document is expiring within 30 days
    - Incomplete: Missing required documents or has rejected documents
    """
    # Get all documents for the employee
    documents = db.query(models.Document).filter(models.Document.employee_id == employee_id).all()
    
    # Check if there are any documents
    if not documents:
        return "Incomplete"
    
    # Check for required document types (this would be customized based on your requirements)
    required_types = ["SIA License", "ID Card", "Proof of Address", "Right to Work"]
    document_types = [doc.document_type for doc in documents if doc.status == "Approved"]
    
    # Check if all required documents are present
    missing_required = any(req_type not in document_types for req_type in required_types)
    if missing_required:
        return "Incomplete"
    
    # Check for expiring documents
    thirty_days_from_now = datetime.now() + timedelta(days=30)
    expiring_soon = any(
        doc.expiry_date and doc.expiry_date <= thirty_days_from_now and doc.expiry_date >= datetime.now()
        for doc in documents if doc.status == "Approved"
    )
    
    if expiring_soon:
        return "Expiring Soon"
    
    return "Complete"

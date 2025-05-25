from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import shutil
from datetime import datetime

from backend.database import get_db
from backend.models import Document, Employee, User
from backend.schemas import DocumentCreate, DocumentResponse, DocumentStatusUpdate
from backend.auth import get_current_user

router = APIRouter(prefix="/api/documents", tags=["documents"])

# Ensure upload directory exists
UPLOAD_DIR = "uploads/documents"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=List[DocumentResponse])
async def get_documents(
    employee_id: Optional[int] = None,
    status: Optional[str] = None,
    document_type: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all documents with optional filtering.
    Regular employees can only see their own documents.
    """
    query = db.query(Document)
    
    # Apply filters
    if employee_id:
        # Check if user has permission to view these documents
        if current_user.role != "admin" and current_user.employee_id != employee_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to view these documents"
            )
        query = query.filter(Document.employee_id == employee_id)
    elif current_user.role != "admin" and current_user.employee_id:
        # Regular employees can only see their own documents
        query = query.filter(Document.employee_id == current_user.employee_id)
    
    if status:
        query = query.filter(Document.status == status)
    
    if document_type:
        query = query.filter(Document.document_type == document_type)
    
    # Get total count
    total = query.count()
    
    # Apply pagination
    documents = query.offset(skip).limit(limit).all()
    
    return {
        "items": documents,
        "total": total,
        "page": skip // limit + 1 if limit > 0 else 1,
        "pages": (total + limit - 1) // limit if limit > 0 else 1
    }

@router.get("/{document_id}", response_model=DocumentResponse)
async def get_document(
    document_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get a specific document by ID.
    Regular employees can only see their own documents.
    """
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Check if user has permission to view this document
    if current_user.role != "admin" and current_user.employee_id != document.employee_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this document"
        )
    
    return document

@router.post("/upload", response_model=DocumentResponse)
async def upload_document(
    employee_id: int = Form(...),
    document_type: str = Form(...),
    expiry_date: Optional[str] = Form(None),
    notes: Optional[str] = Form(None),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Upload a new document for an employee.
    Regular employees can only upload documents for themselves.
    """
    # Check if user has permission to upload for this employee
    if current_user.role != "admin" and current_user.employee_id != employee_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to upload documents for this employee"
        )
    
    # Check if employee exists
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    # Create employee directory if it doesn't exist
    employee_dir = f"{UPLOAD_DIR}/{employee_id}"
    os.makedirs(employee_dir, exist_ok=True)
    
    # Generate a unique filename
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"{timestamp}_{file.filename}"
    file_path = f"{employee_dir}/{filename}"
    
    # Save the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Parse expiry date if provided
    expiry_date_obj = None
    if expiry_date:
        try:
            expiry_date_obj = datetime.strptime(expiry_date, "%Y-%m-%d")
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid expiry date format. Use YYYY-MM-DD."
            )
    
    # Create document record
    document = Document(
        employee_id=employee_id,
        document_type=document_type,
        file_path=file_path,
        upload_date=datetime.now(),
        expiry_date=expiry_date_obj,
        status="Pending",  # All uploaded documents start as pending
        notes=notes
    )
    
    db.add(document)
    db.commit()
    db.refresh(document)
    
    return document

@router.put("/{document_id}/status", response_model=DocumentResponse)
async def update_document_status(
    document_id: int,
    status_update: DocumentStatusUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update the status of a document.
    Only admins can update document status.
    """
    # Check if user has permission
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update document status"
        )
    
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Update status and notes
    document.status = status_update.status
    if status_update.notes:
        document.notes = status_update.notes
    
    db.commit()
    db.refresh(document)
    
    return document

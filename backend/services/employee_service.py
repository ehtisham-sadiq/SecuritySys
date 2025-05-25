from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
import models
import schemas

def get_employee(db: Session, employee_id: int):
    return db.query(models.Employee).filter(models.Employee.id == employee_id).first()

def get_employees(
    db: Session, 
    skip: int = 0, 
    limit: int = 100, 
    status: Optional[str] = None,
    location: Optional[str] = None,
    role: Optional[str] = None,
    document_status: Optional[str] = None,
    search: Optional[str] = None
):
    query = db.query(models.Employee)
    
    if status:
        query = query.filter(models.Employee.status == status)
    
    if location:
        query = query.filter(models.Employee.location == location)
    
    if role:
        query = query.filter(models.Employee.role == role)
    
    if document_status:
        # This is more complex as it requires joining with documents
        # For simplicity, we'll implement a basic version
        if document_status == "Complete":
            query = query.filter(models.Employee.documents.any(models.Document.status == "Approved"))
        elif document_status == "Incomplete":
            query = query.filter(models.Employee.documents.any(models.Document.status != "Approved"))
    
    if search:
        query = query.filter(
            or_(
                models.Employee.first_name.ilike(f"%{search}%"),
                models.Employee.last_name.ilike(f"%{search}%"),
                models.Employee.email.ilike(f"%{search}%")
            )
        )
    
    return query.offset(skip).limit(limit).all()

def create_employee(db: Session, employee: schemas.EmployeeCreate):
    db_employee = models.Employee(
        first_name=employee.first_name,
        last_name=employee.last_name,
        email=employee.email,
        phone=employee.phone,
        address=employee.address,
        postal_code=employee.postal_code,
        location=employee.location,
        role=employee.role,
        status=employee.status,
        join_date=employee.join_date,
        availability=employee.availability
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

def update_employee(db: Session, employee_id: int, employee: schemas.EmployeeUpdate):
    db_employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if not db_employee:
        return None
    
    # Update employee fields if provided
    for key, value in employee.dict(exclude_unset=True).items():
        setattr(db_employee, key, value)
    
    db.commit()
    db.refresh(db_employee)
    return db_employee

def delete_employee(db: Session, employee_id: int):
    db_employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if not db_employee:
        return None
    
    db.delete(db_employee)
    db.commit()
    return db_employee

def get_employee_certifications(db: Session, employee_id: int):
    return db.query(models.Certification).filter(models.Certification.employee_id == employee_id).all()

def add_certification(db: Session, certification: schemas.CertificationCreate):
    db_certification = models.Certification(
        employee_id=certification.employee_id,
        certification_type=certification.certification_type,
        issue_date=certification.issue_date,
        expiry_date=certification.expiry_date,
        certificate_number=certification.certificate_number,
        issuing_authority=certification.issuing_authority
    )
    db.add(db_certification)
    db.commit()
    db.refresh(db_certification)
    return db_certification

def update_employee_rating(db: Session, employee_id: int, new_rating: float):
    db_employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if not db_employee:
        return None
    
    db_employee.rating = new_rating
    db.commit()
    db.refresh(db_employee)
    return db_employee

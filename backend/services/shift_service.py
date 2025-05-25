from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import List, Optional, Dict
import models
import schemas
from datetime import datetime, timedelta

def get_shift(db: Session, shift_id: int):
    return db.query(models.Shift).filter(models.Shift.id == shift_id).first()

def get_shifts(
    db: Session, 
    skip: int = 0, 
    limit: int = 100, 
    status: Optional[str] = None,
    client_id: Optional[int] = None,
    location: Optional[str] = None,
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
    employee_id: Optional[int] = None
):
    query = db.query(models.Shift)
    
    if status:
        query = query.filter(models.Shift.status == status)
    
    if client_id:
        query = query.filter(models.Shift.client_id == client_id)
    
    if location:
        # Join with Site to filter by location
        query = query.join(models.Site).filter(models.Site.location == location)
    
    if date_from:
        query = query.filter(models.Shift.date >= date_from)
    
    if date_to:
        query = query.filter(models.Shift.date <= date_to)
    
    if employee_id:
        # Filter shifts assigned to a specific employee
        query = query.filter(models.Shift.employees.any(models.Employee.id == employee_id))
    
    return query.offset(skip).limit(limit).all()

def create_shift(db: Session, shift: schemas.ShiftCreate):
    # Get client and site names for convenience
    client = db.query(models.Client).filter(models.Client.id == shift.client_id).first()
    site = db.query(models.Site).filter(models.Site.id == shift.site_id).first()
    
    client_name = client.name if client else "Unknown Client"
    site_name = site.name if site else "Unknown Site"
    
    db_shift = models.Shift(
        client_id=shift.client_id,
        site_id=shift.site_id,
        title=shift.title,
        date=shift.date,
        start_time=shift.start_time,
        end_time=shift.end_time,
        status=shift.status,
        required_officers=shift.required_officers,
        shift_type=shift.shift_type,
        requirements=shift.requirements,
        description=shift.description,
        client_name=client_name,
        site_name=site_name
    )
    db.add(db_shift)
    db.commit()
    db.refresh(db_shift)
    return db_shift

def update_shift(db: Session, shift_id: int, shift: schemas.ShiftUpdate):
    db_shift = db.query(models.Shift).filter(models.Shift.id == shift_id).first()
    if not db_shift:
        return None
    
    # Update shift fields if provided
    for key, value in shift.dict(exclude_unset=True).items():
        setattr(db_shift, key, value)
    
    db.commit()
    db.refresh(db_shift)
    return db_shift

def assign_employees_to_shift(db: Session, shift_id: int, employee_ids: List[int]):
    db_shift = db.query(models.Shift).filter(models.Shift.id == shift_id).first()
    if not db_shift:
        return None
    
    # Clear existing assignments
    db_shift.employees = []
    
    # Add new assignments
    for employee_id in employee_ids:
        employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
        if employee:
            db_shift.employees.append(employee)
    
    # Update shift status
    if db_shift.employees:
        db_shift.status = "Assigned"
    else:
        db_shift.status = "Unassigned"
    
    db.commit()
    db.refresh(db_shift)
    return db_shift

def auto_assign_shifts(
    db: Session, 
    shift_ids: List[int],
    location_priority: float = 0.4,
    certification_priority: float = 0.3,
    performance_priority: float = 0.3
):
    """
    Automatically assign employees to shifts based on various criteria:
    - Location proximity
    - Required certifications
    - Performance rating
    - Availability
    """
    assigned_shifts = []
    
    # Get all active employees
    employees = db.query(models.Employee).filter(models.Employee.status == "Active").all()
    
    # Process each shift
    for shift_id in shift_ids:
        shift = db.query(models.Shift).filter(models.Shift.id == shift_id).first()
        if not shift:
            continue
        
        # Get shift requirements
        site = db.query(models.Site).filter(models.Site.id == shift.site_id).first()
        shift_location = site.location if site else None
        shift_requirements = shift.requirements.split(",") if shift.requirements else []
        
        # Calculate scores for each employee
        employee_scores = []
        for employee in employees:
            # Skip employees who are already assigned to shifts at the same time
            if is_employee_available(db, employee.id, shift.date, shift.start_time, shift.end_time):
                # Calculate location score (0-1)
                location_score = 1.0 if employee.location == shift_location else 0.5
                
                # Calculate certification score (0-1)
                certification_score = calculate_certification_score(db, employee.id, shift_requirements)
                
                # Performance score is already 0-5, normalize to 0-1
                performance_score = employee.rating / 5.0
                
                # Calculate total score
                total_score = (
                    location_priority * location_score +
                    certification_priority * certification_score +
                    performance_priority * performance_score
                )
                
                employee_scores.append((employee, total_score))
        
        # Sort employees by score (highest first)
        employee_scores.sort(key=lambda x: x[1], reverse=True)
        
        # Select top N employees based on required officers
        selected_employees = [e[0] for e in employee_scores[:shift.required_officers]]
        
        # Assign employees to shift
        shift.employees = selected_employees
        
        # Update shift status
        if shift.employees:
            shift.status = "Assigned"
        else:
            shift.status = "Unassigned"
        
        db.commit()
        db.refresh(shift)
        assigned_shifts.append(shift)
    
    return assigned_shifts

def is_employee_available(db: Session, employee_id: int, date: datetime, start_time: str, end_time: str):
    """Check if an employee is available for a shift"""
    # Get all shifts for the employee on the same date
    employee_shifts = db.query(models.Shift).filter(
        models.Shift.employees.any(models.Employee.id == employee_id),
        models.Shift.date == date
    ).all()
    
    # Check for time conflicts
    for shift in employee_shifts:
        if is_time_conflict(start_time, end_time, shift.start_time, shift.end_time):
            return False
    
    return True

def is_time_conflict(start1: str, end1: str, start2: str, end2: str):
    """Check if two time ranges overlap"""
    # Convert time strings to datetime objects for comparison
    # Assuming time format is "HH:MM AM/PM"
    format_str = "%I:%M %p"
    
    start1_time = datetime.strptime(start1, format_str)
    end1_time = datetime.strptime(end1, format_str)
    start2_time = datetime.strptime(start2, format_str)
    end2_time = datetime.strptime(end2, format_str)
    
    # Check for overlap
    return (start1_time < end2_time) and (start2_time < end1_time)

def calculate_certification_score(db: Session, employee_id: int, requirements: List[str]):
    """Calculate how well an employee's certifications match the requirements"""
    if not requirements:
        return 1.0  # No requirements, perfect match
    
    # Get employee certifications
    certifications = db.query(models.Certification).filter(
        models.Certification.employee_id == employee_id,
        models.Certification.expiry_date > datetime.now()  # Only valid certifications
    ).all()
    
    employee_cert_types = [cert.certification_type for cert in certifications]
    
    # Count matching certifications
    matches = sum(1 for req in requirements if req in employee_cert_types)
    
    # Calculate score (0-1)
    return matches / len(requirements) if requirements else 1.0

def get_upcoming_shifts(db: Session, days: int = 7):
    """Get shifts coming up in the next specified number of days"""
    today = datetime.now().date()
    end_date = today + timedelta(days=days)
    
    return db.query(models.Shift).filter(
        models.Shift.date >= today,
        models.Shift.date <= end_date
    ).all()

def get_active_shifts(db: Session):
    """Get shifts that are currently in progress"""
    today = datetime.now().date()
    
    return db.query(models.Shift).filter(
        models.Shift.date == today,
        models.Shift.status == "In Progress"
    ).all()

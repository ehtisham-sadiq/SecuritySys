from sqlalchemy.orm import Session
from typing import List, Dict, Any
import datetime
import math

from backend.models import Employee, Shift, Certification, Client, Site, shift_employee

class ShiftAssignmentAlgorithm:
    def __init__(self, db: Session):
        self.db = db
    
    def auto_assign_shifts(
        self, 
        shift_ids: List[int], 
        location_priority: float = 0.4,
        certification_priority: float = 0.3,
        performance_priority: float = 0.3
    ) -> List[Shift]:
        """
        Automatically assign employees to shifts based on various factors:
        - Location proximity
        - Required certifications
        - Performance rating
        - Availability
        - Workload balance
        
        Args:
            shift_ids: List of shift IDs to assign
            location_priority: Weight for location matching (0-1)
            certification_priority: Weight for certification matching (0-1)
            performance_priority: Weight for performance rating (0-1)
            
        Returns:
            List of updated shifts with assignments
        """
        # Validate priorities sum to 1
        total_priority = location_priority + certification_priority + performance_priority
        if not math.isclose(total_priority, 1.0, abs_tol=0.01):
            location_priority = 0.4
            certification_priority = 0.3
            performance_priority = 0.3
        
        # Get shifts to assign
        shifts = self.db.query(Shift).filter(Shift.id.in_(shift_ids)).all()
        if not shifts:
            return []
        
        # Get all active employees
        active_employees = self.db.query(Employee).filter(Employee.status == "Active").all()
        if not active_employees:
            return []
        
        # Get employee certifications
        employee_certifications = {}
        for employee in active_employees:
            certs = self.db.query(Certification).filter(Certification.employee_id == employee.id).all()
            employee_certifications[employee.id] = [cert.certification_type for cert in certs]
        
        # Get employee current workload (number of assigned shifts in the next 7 days)
        today = datetime.datetime.now().date()
        next_week = today + datetime.timedelta(days=7)
        
        employee_workload = {}
        for employee in active_employees:
            assigned_shifts = self.db.query(Shift).join(
                shift_employee, Shift.id == shift_employee.c.shift_id
            ).filter(
                shift_employee.c.employee_id == employee.id,
                Shift.date >= today,
                Shift.date <= next_week
            ).count()
            
            employee_workload[employee.id] = assigned_shifts
        
        # Process each shift
        for shift in shifts:
            # Skip shifts that are not unassigned
            if shift.status != "Unassigned":
                continue
            
            # Get client and site details
            client = self.db.query(Client).filter(Client.id == shift.client_id).first()
            site = self.db.query(Site).filter(Site.id == shift.site_id).first()
            
            if not client or not site:
                continue
            
            # Calculate scores for each employee
            employee_scores = {}
            for employee in active_employees:
                # Skip employees who already have a shift at this time
                has_conflict = self.db.query(Shift).join(
                    shift_employee, Shift.id == shift_employee.c.shift_id
                ).filter(
                    shift_employee.c.employee_id == employee.id,
                    Shift.date == shift.date,
                    Shift.start_time <= shift.end_time,
                    Shift.end_time >= shift.start_time
                ).first() is not None
                
                if has_conflict:
                    continue
                
                # Calculate location score (0-1)
                location_score = 1.0 if employee.location == site.location else 0.5
                
                # Calculate certification score (0-1)
                # For simplicity, we'll just check if they have SIA License
                certification_score = 1.0 if "SIA License" in employee_certifications.get(employee.id, []) else 0.0
                
                # Calculate performance score (0-1)
                performance_score = employee.rating / 5.0 if employee.rating else 0.5
                
                # Calculate workload penalty (0-0.5)
                workload = employee_workload.get(employee.id, 0)
                workload_penalty = min(workload * 0.1, 0.5)  # 0.1 penalty per shift, max 0.5
                
                # Calculate final score
                final_score = (
                    location_priority * location_score +
                    certification_priority * certification_score +
                    performance_priority * performance_score -
                    workload_penalty
                )
                
                employee_scores[employee.id] = final_score
            
            # Sort employees by score
            sorted_employees = sorted(
                employee_scores.items(), 
                key=lambda x: x[1], 
                reverse=True
            )
            
            # Assign required number of officers
            assigned_count = 0
            for employee_id, score in sorted_employees:
                if assigned_count >= shift.required_officers:
                    break
                
                # Add assignment
                self.db.execute(
                    shift_employee.insert().values(
                        shift_id=shift.id,
                        employee_id=employee_id
                    )
                )
                
                # Update employee workload
                employee_workload[employee_id] = employee_workload.get(employee_id, 0) + 1
                
                assigned_count += 1
            
            # Update shift status if all required officers were assigned
            if assigned_count >= shift.required_officers:
                shift.status = "Assigned"
            
        # Commit changes
        self.db.commit()
        
        # Refresh shifts
        for shift in shifts:
            self.db.refresh(shift)
        
        return shifts

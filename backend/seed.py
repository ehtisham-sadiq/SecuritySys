import os
import sys
from datetime import datetime, timedelta
import bcrypt
from sqlalchemy.orm import Session

# Add the parent directory to the path so we can import our modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import SessionLocal, engine
import backend.models as models

# Create all tables
models.Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    try:
        # Check if we already have data
        user_count = db.query(models.User).count()
        if user_count > 0:
            print("Database already has data. Skipping seed.")
            return
        
        # Create admin user
        hashed_password = bcrypt.hashpw("admin123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        admin_user = models.User(
            email="admin@securitysystem.com",
            hashed_password=hashed_password,
            first_name="Admin",
            last_name="User",
            role="admin",
            is_active=True
        )
        db.add(admin_user)
        
        # Create clients
        clients = [
            models.Client(
                name="Retail Mall",
                type="Retail",
                location="London",
                address="123 Shopping St, London, UK",
                contact_name="John Retail",
                contact_email="john@retailmall.com",
                contact_phone="020-1234-5678",
                status="Active"
            ),
            models.Client(
                name="Corporate Tower",
                type="Corporate",
                location="Manchester",
                address="456 Business Ave, Manchester, UK",
                contact_name="Sarah Corp",
                contact_email="sarah@corporatetower.com",
                contact_phone="0161-8765-4321",
                status="Active"
            ),
            models.Client(
                name="Event Center",
                type="Event",
                location="Birmingham",
                address="789 Festival Rd, Birmingham, UK",
                contact_name="Mike Event",
                contact_email="mike@eventcenter.com",
                contact_phone="0121-5555-7777",
                status="Active"
            )
        ]
        db.add_all(clients)
        db.flush()  # Flush to get IDs
        
        # Create sites for each client
        sites = []
        for client in clients:
            sites.append(
                models.Site(
                    client_id=client.id,
                    name=f"{client.name} Main Site",
                    address=client.address,
                    location=client.location,
                    contact_name=client.contact_name,
                    contact_phone=client.contact_phone,
                    status="Active"
                )
            )
            if client.type == "Retail":
                sites.append(
                    models.Site(
                        client_id=client.id,
                        name=f"{client.name} Parking",
                        address=f"{client.address} Parking Area",
                        location=client.location,
                        contact_name=client.contact_name,
                        contact_phone=client.contact_phone,
                        status="Active"
                    )
                )
        db.add_all(sites)
        db.flush()
        
        # Create employees
        employees = [
            models.Employee(
                first_name="David",
                last_name="Smith",
                email="david@securitysystem.com",
                phone="07700-900123",
                address="10 Security St, London, UK",
                postal_code="SW1A 1AA",
                location="London",
                role="Security Officer",
                status="Active",
                join_date=datetime.now() - timedelta(days=365),
                rating=4.5,
                availability="Full-time"
            ),
            models.Employee(
                first_name="Emma",
                last_name="Johnson",
                email="emma@securitysystem.com",
                phone="07700-900456",
                address="20 Guard Ave, Manchester, UK",
                postal_code="M1 1AE",
                location="Manchester",
                role="Supervisor",
                status="Active",
                join_date=datetime.now() - timedelta(days=180),
                rating=4.8,
                availability="Full-time"
            ),
            models.Employee(
                first_name="James",
                last_name="Williams",
                email="james@securitysystem.com",
                phone="07700-900789",
                address="30 Patrol Rd, Birmingham, UK",
                postal_code="B1 1AA",
                location="Birmingham",
                role="Security Officer",
                status="Active",
                join_date=datetime.now() - timedelta(days=90),
                rating=4.2,
                availability="Part-time"
            ),
            models.Employee(
                first_name="Sophia",
                last_name="Brown",
                email="sophia@securitysystem.com",
                phone="07700-900321",
                address="40 Watch St, London, UK",
                postal_code="SW1A 2BB",
                location="London",
                role="Security Officer",
                status="Pending",
                join_date=datetime.now() - timedelta(days=30),
                rating=0.0,
                availability="Full-time"
            ),
            models.Employee(
                first_name="Oliver",
                last_name="Jones",
                email="oliver@securitysystem.com",
                phone="07700-900654",
                address="50 Monitor Ave, Manchester, UK",
                postal_code="M1 2BB",
                location="Manchester",
                role="Security Officer",
                status="Inactive",
                join_date=datetime.now() - timedelta(days=500),
                inactive_date=datetime.now() - timedelta(days=30),
                inactive_reason="Resigned",
                rating=3.9,
                availability="Full-time"
            )
        ]
        db.add_all(employees)
        db.flush()
        
        # Create user accounts for employees
        for employee in employees:
            hashed_password = bcrypt.hashpw("password123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            user = models.User(
                email=employee.email,
                hashed_password=hashed_password,
                first_name=employee.first_name,
                last_name=employee.last_name,
                role="employee",
                is_active=employee.status == "Active",
                employee_id=employee.id
            )
            db.add(user)
        
        # Create certifications for employees
        certifications = []
        for employee in employees:
            if employee.role in ["Security Officer", "Supervisor"]:
                certifications.append(
                    models.Certification(
                        employee_id=employee.id,
                        certification_type="SIA License",
                        issue_date=datetime.now() - timedelta(days=365),
                        expiry_date=datetime.now() + timedelta(days=365),
                        certificate_number=f"SIA{employee.id}12345",
                        issuing_authority="Security Industry Authority"
                    )
                )
            if employee.role == "Supervisor":
                certifications.append(
                    models.Certification(
                        employee_id=employee.id,
                        certification_type="First Aid",
                        issue_date=datetime.now() - timedelta(days=180),
                        expiry_date=datetime.now() + timedelta(days=180),
                        certificate_number=f"FA{employee.id}67890",
                        issuing_authority="Red Cross"
                    )
                )
        db.add_all(certifications)
        
        # Create documents for employees
        documents = []
        for employee in employees:
            documents.append(
                models.Document(
                    employee_id=employee.id,
                    document_type="ID Card",
                    file_path=f"/uploads/documents/{employee.id}/id_card.pdf",
                    upload_date=datetime.now() - timedelta(days=30),
                    status="Approved" if employee.status == "Active" else "Pending",
                    notes="Valid government-issued ID"
                )
            )
            documents.append(
                models.Document(
                    employee_id=employee.id,
                    document_type="Proof of Address",
                    file_path=f"/uploads/documents/{employee.id}/proof_of_address.pdf",
                    upload_date=datetime.now() - timedelta(days=30),
                    status="Approved" if employee.status == "Active" else "Pending",
                    notes="Utility bill"
                )
            )
            if employee.status == "Pending":
                documents.append(
                    models.Document(
                        employee_id=employee.id,
                        document_type="SIA License",
                        file_path=f"/uploads/documents/{employee.id}/sia_license.pdf",
                        upload_date=datetime.now() - timedelta(days=15),
                        expiry_date=datetime.now() + timedelta(days=365),
                        status="Pending",
                        notes="Awaiting verification"
                    )
                )
        db.add_all(documents)
        
        # Create shifts
        shifts = []
        for i, site in enumerate(sites):
            # Past shifts
            for day in range(7, 0, -1):
                shift_date = datetime.now() - timedelta(days=day)
                shifts.append(
                    models.Shift(
                        client_id=site.client_id,
                        site_id=site.id,
                        title=f"Regular Shift at {site.name}",
                        date=shift_date,
                        start_time="08:00",
                        end_time="16:00",
                        status="Completed",
                        required_officers=2,
                        shift_type="Regular",
                        description=f"Regular security shift at {site.name}"
                    )
                )
            
            # Current shifts
            shifts.append(
                models.Shift(
                    client_id=site.client_id,
                    site_id=site.id,
                    title=f"Regular Shift at {site.name}",
                    date=datetime.now(),
                    start_time="08:00",
                    end_time="16:00",
                    status="In Progress",
                    required_officers=2,
                    shift_type="Regular",
                    description=f"Regular security shift at {site.name}"
                )
            )
            
            # Future shifts
            for day in range(1, 8):
                shift_date = datetime.now() + timedelta(days=day)
                shifts.append(
                    models.Shift(
                        client_id=site.client_id,
                        site_id=site.id,
                        title=f"Regular Shift at {site.name}",
                        date=shift_date,
                        start_time="08:00",
                        end_time="16:00",
                        status="Assigned" if day < 3 else "Unassigned",
                        required_officers=2,
                        shift_type="Regular",
                        description=f"Regular security shift at {site.name}"
                    )
                )
        db.add_all(shifts)
        db.flush()
        
        # Assign employees to shifts
        shift_assignments = []
        active_employees = [e for e in employees if e.status == "Active"]
        for i, shift in enumerate(shifts):
            if shift.status in ["Completed", "In Progress", "Assigned"]:
                # Assign 2 employees to each shift
                for j in range(min(2, len(active_employees))):
                    employee = active_employees[(i + j) % len(active_employees)]
                    shift_assignments.append({
                        "shift_id": shift.id,
                        "employee_id": employee.id
                    })
        
        # Insert shift assignments
        for assignment in shift_assignments:
            db.execute(
                models.shift_employee.insert().values(
                    shift_id=assignment["shift_id"],
                    employee_id=assignment["employee_id"]
                )
            )
        
        # Create incidents
        incidents = []
        completed_shifts = [s for s in shifts if s.status == "Completed"]
        if completed_shifts:
            incidents.append(
                models.Incident(
                    shift_id=completed_shifts[0].id,
                    reported_by=active_employees[0].id,
                    incident_type="Trespassing",
                    description="Individual attempting to access restricted area",
                    time=datetime.now() - timedelta(days=3, hours=2),
                    severity="Medium",
                    status="Resolved",
                    resolution="Individual escorted off premises"
                )
            )
            if len(completed_shifts) > 1:
                incidents.append(
                    models.Incident(
                        shift_id=completed_shifts[1].id,
                        reported_by=active_employees[1].id,
                        incident_type="Suspicious Package",
                        description="Unattended package found in lobby",
                        time=datetime.now() - timedelta(days=5, hours=4),
                        severity="High",
                        status="Resolved",
                        resolution="Package inspected by authorities and found to be harmless"
                    )
                )
        db.add_all(incidents)
        
        # Create notifications
        notifications = []
        users = db.query(models.User).all()
        for user in users:
            if user.role == "admin":
                notifications.append(
                    models.Notification(
                        user_id=user.id,
                        title="Welcome to Security Management System",
                        message="Thank you for using our system. Get started by exploring the dashboard.",
                        type="system",
                        is_read=False
                    )
                )
                notifications.append(
                    models.Notification(
                        user_id=user.id,
                        title="New Document Uploaded",
                        message="A new document has been uploaded and requires your review.",
                        type="document",
                        reference_id=documents[0].id if documents else None,
                        is_read=False
                    )
                )
            elif user.role == "employee" and user.is_active:
                notifications.append(
                    models.Notification(
                        user_id=user.id,
                        title="Welcome to Security Management System",
                        message="Thank you for joining our team. Please complete your profile.",
                        type="system",
                        is_read=False
                    )
                )
                notifications.append(
                    models.Notification(
                        user_id=user.id,
                        title="New Shift Assignment",
                        message="You have been assigned to a new shift. Check your schedule.",
                        type="shift",
                        reference_id=shifts[0].id if shifts else None,
                        is_read=False
                    )
                )
        db.add_all(notifications)
        
        # Commit all changes
        db.commit()
        print("Database seeded successfully!")
        
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()

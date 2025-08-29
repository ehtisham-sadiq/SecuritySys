import os
import sys
import bcrypt
from datetime import datetime, timedelta
import random
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError

# Add the parent directory to the path so we can import our modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import models
from backend.database import Base
from backend.models import User, Employee, Document, Certification, Client, Site, Shift, Incident, Notification, shift_employee

# Get database URL from environment variable
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./security_system.db")

# Create engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def seed_database():
    db = SessionLocal()
    try:
        print("Starting database seeding...")
        
        # Check if we already have data
        user_count = db.query(User).count()
        if user_count > 0:
            print("Database already has data. Skipping seed.")
            return
        
        # Create admin user
        print("Creating admin user...")
        hashed_password = bcrypt.hashpw("admin123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        admin_user = User(
            email="admin@securitysystem.com",
            hashed_password=hashed_password,
            first_name="Admin",
            last_name="User",
            role="admin",
            is_active=True
        )
        db.add(admin_user)
        db.flush()
        
        # Create locations
        locations = ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Edinburgh"]
        
        # Create clients
        print("Creating clients...")
        client_types = ["Retail", "Corporate", "Event", "Educational", "Healthcare"]
        clients = []
        for i in range(1, 6):
            client_type = client_types[i % len(client_types)]
            location = locations[i % len(locations)]
            client = Client(
                name=f"{client_type} Client {i}",
                type=client_type,
                location=location,
                address=f"{100+i} Client Street, {location}, UK",
                contact_name=f"Contact {i}",
                contact_email=f"contact{i}@client{i}.com",
                contact_phone=f"+44 7{i}00 900{i}00",
                status="Active"
            )
            clients.append(client)
        db.add_all(clients)
        db.flush()
        
        # Create sites for each client
        print("Creating sites...")
        sites = []
        for client in clients:
            # Main site
            sites.append(
                Site(
                    client_id=client.id,
                    name=f"{client.name} Main Site",
                    address=client.address,
                    location=client.location,
                    contact_name=client.contact_name,
                    contact_phone=client.contact_phone,
                    status="Active"
                )
            )
            
            # Secondary site
            sites.append(
                Site(
                    client_id=client.id,
                    name=f"{client.name} Secondary Site",
                    address=f"{int(client.address.split()[0])+50} Client Avenue, {client.location}, UK",
                    location=client.location,
                    contact_name=client.contact_name,
                    contact_phone=client.contact_phone,
                    status="Active"
                )
            )
        db.add_all(sites)
        db.flush()
        
        # Create employees
        print("Creating employees...")
        roles = ["Security Officer", "Supervisor", "Manager"]
        statuses = ["Active", "Active", "Active", "Pending", "Inactive"]  # More active employees
        availability_types = ["Full-time", "Part-time"]
        
        employees = []
        for i in range(1, 21):  # Create 20 employees
            status = statuses[i % len(statuses)]
            role = roles[i % len(roles)]
            location = locations[i % len(locations)]
            join_date = datetime.now() - timedelta(days=random.randint(30, 730))
            
            employee = Employee(
                first_name=f"FirstName{i}",
                last_name=f"LastName{i}",
                email=f"employee{i}@securitysystem.com",
                phone=f"+44 7{i}00 900{i}00",
                address=f"{100+i} Employee Street, {location}, UK",
                postal_code=f"AB{i} {i}CD",
                location=location,
                role=role,
                status=status,
                join_date=join_date,
                rating=round(random.uniform(3.0, 5.0), 1),
                availability=availability_types[i % len(availability_types)]
            )
            
            # Add inactive date and reason for inactive employees
            if status == "Inactive":
                employee.inactive_date = datetime.now() - timedelta(days=random.randint(1, 60))
                employee.inactive_reason = random.choice(["Resigned", "License Expired", "Performance Issues"])
            
            employees.append(employee)
        db.add_all(employees)
        db.flush()
        
        # Create user accounts for employees
        print("Creating user accounts for employees...")
        for employee in employees:
            if employee.status != "Inactive":
                hashed_password = bcrypt.hashpw("password123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
                user = User(
                    email=employee.email,
                    hashed_password=hashed_password,
                    first_name=employee.first_name,
                    last_name=employee.last_name,
                    role="employee",
                    is_active=employee.status == "Active",
                    employee_id=employee.id
                )
                db.add(user)
        db.flush()
        
        # Create certifications for employees
        print("Creating certifications...")
        certification_types = ["SIA License", "First Aid", "CCTV Operation", "Close Protection", "Door Supervision"]
        issuing_authorities = ["Security Industry Authority", "Red Cross", "City & Guilds", "BTEC", "Highfield"]
        
        certifications = []
        for employee in employees:
            # All employees have SIA License
            issue_date = employee.join_date + timedelta(days=random.randint(1, 30))
            expiry_date = issue_date + timedelta(days=365*3)  # 3 years validity
            
            certifications.append(
                Certification(
                    employee_id=employee.id,
                    certification_type="SIA License",
                    issue_date=issue_date,
                    expiry_date=expiry_date,
                    certificate_number=f"SIA{100000+employee.id}",
                    issuing_authority="Security Industry Authority"
                )
            )
            
            # Add 1-3 additional certifications randomly
            for _ in range(random.randint(1, 3)):
                cert_type = random.choice(certification_types[1:])  # Skip SIA License
                issue_date = employee.join_date + timedelta(days=random.randint(30, 180))
                expiry_date = issue_date + timedelta(days=365*2)  # 2 years validity
                
                certifications.append(
                    Certification(
                        employee_id=employee.id,
                        certification_type=cert_type,
                        issue_date=issue_date,
                        expiry_date=expiry_date,
                        certificate_number=f"{cert_type[:2].upper()}{200000+employee.id}",
                        issuing_authority=random.choice(issuing_authorities)
                    )
                )
        db.add_all(certifications)
        db.flush()
        
        # Create documents for employees
        print("Creating documents...")
        document_types = ["ID Card", "Proof of Address", "SIA License", "Training Certificate", "Right to Work"]
        document_statuses = ["Approved", "Pending", "Rejected"]
        
        documents = []
        for employee in employees:
            # All employees have these basic documents
            for doc_type in ["ID Card", "Proof of Address", "SIA License"]:
                status = "Approved" if employee.status == "Active" else "Pending"
                upload_date = employee.join_date + timedelta(days=random.randint(1, 10))
                expiry_date = None
                
                if doc_type == "SIA License":
                    # Find the SIA certification for this employee
                    sia_cert = next((c for c in certifications if c.employee_id == employee.id and c.certification_type == "SIA License"), None)
                    if sia_cert:
                        expiry_date = sia_cert.expiry_date
                
                documents.append(
                    Document(
                        employee_id=employee.id,
                        document_type=doc_type,
                        file_path=f"/uploads/documents/{employee.id}/{doc_type.lower().replace(' ', '_')}.pdf",
                        upload_date=upload_date,
                        expiry_date=expiry_date,
                        status=status,
                        notes=f"Document uploaded during onboarding"
                    )
                )
            
            # Pending employees have some pending documents
            if employee.status == "Pending":
                for doc_type in random.sample(document_types[3:], 2):  # Additional documents
                    upload_date = datetime.now() - timedelta(days=random.randint(1, 30))
                    
                    documents.append(
                        Document(
                            employee_id=employee.id,
                            document_type=doc_type,
                            file_path=f"/uploads/documents/{employee.id}/{doc_type.lower().replace(' ', '_')}.pdf",
                            upload_date=upload_date,
                            expiry_date=None,
                            status="Pending",
                            notes=f"Awaiting verification"
                        )
                    )
        db.add_all(documents)
        db.flush()
        
        # Create shifts
        print("Creating shifts...")
        shift_types = ["Regular", "Emergency", "Event", "Temporary"]
        shift_statuses = ["Unassigned", "Assigned", "Confirmed", "In Progress", "Completed", "Cancelled"]
        
        shifts = []
        # Past shifts (completed)
        for i in range(1, 31):  # Last 30 days
            shift_date = datetime.now() - timedelta(days=i)
            
            for site in random.sample(sites, 3):  # 3 random sites per day
                shift = Shift(
                    client_id=site.client_id,
                    site_id=site.id,
                    title=f"Security Shift at {site.name}",
                    date=shift_date,
                    start_time="08:00",
                    end_time="16:00",
                    status="Completed",
                    required_officers=random.randint(1, 3),
                    shift_type=random.choice(shift_types),
                    requirements="Standard security protocols",
                    description=f"Regular security coverage for {site.name}"
                )
                shifts.append(shift)
        
        # Current shifts (in progress)
        for site in random.sample(sites, 4):  # 4 sites with current shifts
            shift = Shift(
                client_id=site.client_id,
                site_id=site.id,
                title=f"Security Shift at {site.name}",
                date=datetime.now(),
                start_time="08:00",
                end_time="16:00",
                status="In Progress",
                required_officers=random.randint(1, 3),
                shift_type=random.choice(shift_types),
                requirements="Standard security protocols",
                description=f"Regular security coverage for {site.name}"
            )
            shifts.append(shift)
        
        # Future shifts
        for i in range(1, 31):  # Next 30 days
            shift_date = datetime.now() + timedelta(days=i)
            
            for site in random.sample(sites, 2):  # 2 random sites per day
                status = "Assigned" if i <= 7 else "Unassigned"  # Assign shifts for the next week
                
                shift = Shift(
                    client_id=site.client_id,
                    site_id=site.id,
                    title=f"Security Shift at {site.name}",
                    date=shift_date,
                    start_time="08:00",
                    end_time="16:00",
                    status=status,
                    required_officers=random.randint(1, 3),
                    shift_type=random.choice(shift_types),
                    requirements="Standard security protocols",
                    description=f"Regular security coverage for {site.name}"
                )
                shifts.append(shift)
        
        db.add_all(shifts)
        db.flush()
        
        # Assign employees to shifts
        print("Assigning employees to shifts...")
        active_employees = [e for e in employees if e.status == "Active"]
        
        for shift in shifts:
            if shift.status in ["Assigned", "Confirmed", "In Progress", "Completed"]:
                # Assign the required number of officers
                assigned_employees = random.sample(active_employees, min(shift.required_officers, len(active_employees)))
                
                for employee in assigned_employees:
                    db.execute(
                        shift_employee.insert().values(
                            shift_id=shift.id,
                            employee_id=employee.id
                        )
                    )
        
        # Create incidents
        print("Creating incidents...")
        incident_types = ["Trespassing", "Suspicious Activity", "Theft", "Vandalism", "Medical Emergency", "Fire Alarm"]
        severities = ["Low", "Medium", "High"]
        incident_statuses = ["Reported", "Under Investigation", "Resolved"]
        
        incidents = []
        completed_shifts = [s for s in shifts if s.status == "Completed"]
        
        for i in range(min(20, len(completed_shifts))):  # Create up to 20 incidents
            shift = random.choice(completed_shifts)
            
            # Get employees assigned to this shift
            assigned_employee_ids = db.query(shift_employee.c.employee_id).filter(shift_employee.c.shift_id == shift.id).all()
            if not assigned_employee_ids:
                continue
                
            reporter_id = random.choice(assigned_employee_ids)[0]
            incident_time = datetime.combine(shift.date.date(), datetime.strptime(shift.start_time, "%H:%M").time()) + timedelta(hours=random.randint(0, 7))
            
            incident = Incident(
                shift_id=shift.id,
                reported_by=reporter_id,
                incident_type=random.choice(incident_types),
                description=f"Incident reported during shift at {shift.title}",
                time=incident_time,
                severity=random.choice(severities),
                status=random.choice(incident_statuses),
                resolution="Issue addressed according to security protocols" if random.random() > 0.3 else None
            )
            incidents.append(incident)
        
        db.add_all(incidents)
        db.flush()
        
        # Create notifications
        print("Creating notifications...")
        notification_types = ["document", "shift", "incident", "system"]
        
        notifications = []
        users = db.query(User).all()
        
        for user in users:
            # System welcome notification for all users
            notifications.append(
                Notification(
                    user_id=user.id,
                    title="Welcome to Security Management System",
                    message="Thank you for using our system. Get started by exploring the dashboard.",
                    type="system",
                    is_read=random.random() > 0.7  # 30% chance of being read
                )
            )
            
            # Additional notifications based on role
            if user.role == "admin":
                # Document notifications
                for i in range(3):
                    notifications.append(
                        Notification(
                            user_id=user.id,
                            title=f"New Document Uploaded",
                            message=f"A new document has been uploaded and requires your review.",
                            type="document",
                            reference_id=random.choice(documents).id if documents else None,
                            is_read=random.random() > 0.5  # 50% chance of being read
                        )
                    )
                
                # Incident notifications
                for i in range(2):
                    notifications.append(
                        Notification(
                            user_id=user.id,
                            title=f"New Incident Reported",
                            message=f"A new security incident has been reported and requires attention.",
                            type="incident",
                            reference_id=random.choice(incidents).id if incidents else None,
                            is_read=random.random() > 0.3  # 30% chance of being read
                        )
                    )
            
            elif user.role == "employee" and user.employee_id:
                # Get shifts assigned to this employee
                employee_shifts = db.query(Shift).join(shift_employee).filter(shift_employee.c.employee_id == user.employee_id).all()
                
                if employee_shifts:
                    # Shift notifications
                    for i in range(min(3, len(employee_shifts))):
                        shift = random.choice(employee_shifts)
                        notifications.append(
                            Notification(
                                user_id=user.id,
                                title=f"Shift Assignment",
                                message=f"You have been assigned to a shift on {shift.date.strftime('%Y-%m-%d')}.",
                                type="shift",
                                reference_id=shift.id,
                                is_read=random.random() > 0.6  # 40% chance of being read
                            )
                        )
        
        db.add_all(notifications)
        
        # Commit all changes
        db.commit()
        print("Database seeding completed successfully!")
        
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()

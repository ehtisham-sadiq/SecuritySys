from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Text, Float, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

# Association table for shift-employee many-to-many relationship
shift_employee = Table(
    'shift_employee',
    Base.metadata,
    Column('shift_id', Integer, ForeignKey('shifts.id'), primary_key=True),
    Column('employee_id', Integer, ForeignKey('employees.id'), primary_key=True)
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    role = Column(String)  # admin, employee, client
    is_active = Column(Boolean, default=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    employee = relationship("Employee", back_populates="user")
    client = relationship("Client", back_populates="users")
    notifications = relationship("Notification", back_populates="user")

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    address = Column(String)
    postal_code = Column(String)
    location = Column(String)
    role = Column(String)  # Security Officer, Supervisor, Manager
    status = Column(String)  # Active, Pending, Inactive
    join_date = Column(DateTime(timezone=True))
    inactive_date = Column(DateTime(timezone=True), nullable=True)
    inactive_reason = Column(String, nullable=True)
    rating = Column(Float, default=0.0)
    availability = Column(String)  # Full-time, Part-time
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="employee", uselist=False)
    documents = relationship("Document", back_populates="employee")
    certifications = relationship("Certification", back_populates="employee")
    shifts = relationship("Shift", secondary=shift_employee, back_populates="employees")

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"))
    document_type = Column(String)  # SIA License, ID Card, Proof of Address, etc.
    file_path = Column(String)
    upload_date = Column(DateTime(timezone=True), server_default=func.now())
    expiry_date = Column(DateTime(timezone=True), nullable=True)
    status = Column(String)  # Pending, Approved, Rejected
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    employee = relationship("Employee", back_populates="documents")

class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"))
    certification_type = Column(String)  # SIA License, First Aid, CCTV Operation, etc.
    issue_date = Column(DateTime(timezone=True))
    expiry_date = Column(DateTime(timezone=True), nullable=True)
    certificate_number = Column(String, nullable=True)
    issuing_authority = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    employee = relationship("Employee", back_populates="certifications")

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)  # Retail, Corporate, Event
    location = Column(String)
    address = Column(String)
    contact_name = Column(String)
    contact_email = Column(String)
    contact_phone = Column(String)
    status = Column(String)  # Active, Inactive
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    users = relationship("User", back_populates="client")
    sites = relationship("Site", back_populates="client")
    shifts = relationship("Shift", back_populates="client")

class Site(Base):
    __tablename__ = "sites"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    name = Column(String)
    address = Column(String)
    location = Column(String)
    contact_name = Column(String, nullable=True)
    contact_phone = Column(String, nullable=True)
    status = Column(String)  # Active, Inactive
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    client = relationship("Client", back_populates="sites")
    shifts = relationship("Shift", back_populates="site")

class Shift(Base):
    __tablename__ = "shifts"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    site_id = Column(Integer, ForeignKey("sites.id"))
    title = Column(String)
    date = Column(DateTime(timezone=True))
    start_time = Column(String)
    end_time = Column(String)
    status = Column(String)  # Unassigned, Assigned, Confirmed, In Progress, Completed, Cancelled
    required_officers = Column(Integer)
    shift_type = Column(String)  # Regular, Emergency, Event, Temporary
    requirements = Column(Text, nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    client = relationship("Client", back_populates="shifts")
    site = relationship("Site", back_populates="shifts")
    employees = relationship("Employee", secondary=shift_employee, back_populates="shifts")
    incidents = relationship("Incident", back_populates="shift")

class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    shift_id = Column(Integer, ForeignKey("shifts.id"))
    reported_by = Column(Integer, ForeignKey("employees.id"))
    incident_type = Column(String)
    description = Column(Text)
    time = Column(DateTime(timezone=True))
    severity = Column(String)  # Low, Medium, High
    status = Column(String)  # Reported, Under Investigation, Resolved
    resolution = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    shift = relationship("Shift", back_populates="incidents")
    reporter = relationship("Employee", foreign_keys=[reported_by])

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    message = Column(Text)
    type = Column(String)  # document, shift, incident, system
    reference_id = Column(Integer, nullable=True)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="notifications")

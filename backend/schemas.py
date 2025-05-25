from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# User schemas
class UserBase(BaseModel):
    email: EmailStr

class UserLogin(UserBase):
    password: str

class UserCreate(UserBase):
    password: str
    first_name: str
    last_name: str
    role: str

class UserInfo(UserBase):
    id: int
    first_name: str
    last_name: str
    role: str
    is_active: bool
    employee_id: Optional[int] = None
    client_id: Optional[int] = None

    class Config:
        orm_mode = True

# Employee schemas
class EmployeeBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    address: str
    postal_code: str
    location: str
    role: str
    status: str
    availability: str

class EmployeeCreate(EmployeeBase):
    join_date: datetime

class EmployeeUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    postal_code: Optional[str] = None
    location: Optional[str] = None
    role: Optional[str] = None
    status: Optional[str] = None
    availability: Optional[str] = None
    inactive_date: Optional[datetime] = None
    inactive_reason: Optional[str] = None
    rating: Optional[float] = None

class Employee(EmployeeBase):
    id: int
    join_date: datetime
    inactive_date: Optional[datetime] = None
    inactive_reason: Optional[str] = None
    rating: float
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class EmployeeDetail(Employee):
    documents: List["Document"] = []
    certifications: List["Certification"] = []

    class Config:
        orm_mode = True

# Document schemas
class DocumentBase(BaseModel):
    employee_id: int
    document_type: str
    file_path: str
    status: str
    notes: Optional[str] = None

class DocumentCreate(DocumentBase):
    expiry_date: Optional[datetime] = None

class Document(DocumentBase):
    id: int
    upload_date: datetime
    expiry_date: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

# Certification schemas
class CertificationBase(BaseModel):
    employee_id: int
    certification_type: str
    issue_date: datetime
    expiry_date: Optional[datetime] = None
    certificate_number: Optional[str] = None
    issuing_authority: str

class CertificationCreate(CertificationBase):
    pass

class Certification(CertificationBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

# Client schemas
class ClientBase(BaseModel):
    name: str
    type: str
    location: str
    address: str
    contact_name: str
    contact_email: EmailStr
    contact_phone: str
    status: str

class ClientCreate(ClientBase):
    pass

class Client(ClientBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class ClientDetail(Client):
    sites: List["Site"] = []

    class Config:
        orm_mode = True

# Site schemas
class SiteBase(BaseModel):
    client_id: int
    name: str
    address: str
    location: str
    contact_name: Optional[str] = None
    contact_phone: Optional[str] = None
    status: str

class SiteCreate(SiteBase):
    pass

class Site(SiteBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

# Shift schemas
class ShiftBase(BaseModel):
    client_id: int
    site_id: int
    title: str
    date: datetime
    start_time: str
    end_time: str
    status: str
    required_officers: int
    shift_type: str
    description: Optional[str] = None
    requirements: Optional[str] = None

class ShiftCreate(ShiftBase):
    pass

class Shift(ShiftBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class ShiftDetail(Shift):
    client: Client
    site: Site
    employees: List[Employee] = []
    incidents: List["Incident"] = []

    class Config:
        orm_mode = True

# Incident schemas
class IncidentBase(BaseModel):
    shift_id: int
    reported_by: int
    incident_type: str
    description: str
    time: datetime
    severity: str
    status: str
    resolution: Optional[str] = None

class IncidentCreate(IncidentBase):
    pass

class Incident(IncidentBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

# Notification schemas
class NotificationBase(BaseModel):
    user_id: int
    title: str
    message: str
    type: str
    reference_id: Optional[int] = None
    is_read: bool = False

class NotificationCreate(NotificationBase):
    pass

class Notification(NotificationBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# Update forward references
EmployeeDetail.update_forward_refs()
ShiftDetail.update_forward_refs()
ClientDetail.update_forward_refs()

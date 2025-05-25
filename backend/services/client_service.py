from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
import models
import schemas

def get_client(db: Session, client_id: int):
    return db.query(models.Client).filter(models.Client.id == client_id).first()

def get_clients(
    db: Session, 
    skip: int = 0, 
    limit: int = 100, 
    status: Optional[str] = None,
    location: Optional[str] = None,
    type: Optional[str] = None,
    search: Optional[str] = None
):
    query = db.query(models.Client)
    
    if status:
        query = query.filter(models.Client.status == status)
    
    if location:
        query = query.filter(models.Client.location == location)
    
    if type:
        query = query.filter(models.Client.type == type)
    
    if search:
        query = query.filter(
            or_(
                models.Client.name.ilike(f"%{search}%"),
                models.Client.contact_name.ilike(f"%{search}%"),
                models.Client.contact_email.ilike(f"%{search}%")
            )
        )
    
    return query.offset(skip).limit(limit).all()

def create_client(db: Session, client: schemas.ClientCreate):
    db_client = models.Client(
        name=client.name,
        type=client.type,
        location=client.location,
        address=client.address,
        contact_name=client.contact_name,
        contact_email=client.contact_email,
        contact_phone=client.contact_phone,
        status=client.status
    )
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

def update_client(db: Session, client_id: int, client: schemas.ClientUpdate):
    db_client = db.query(models.Client).filter(models.Client.id == client_id).first()
    if not db_client:
        return None
    
    # Update client fields if provided
    for key, value in client.dict(exclude_unset=True).items():
        setattr(db_client, key, value)
    
    db.commit()
    db.refresh(db_client)
    return db_client

def create_site(db: Session, site: schemas.SiteCreate):
    db_site = models.Site(
        client_id=site.client_id,
        name=site.name,
        address=site.address,
        location=site.location,
        contact_name=site.contact_name,
        contact_phone=site.contact_phone,
        status=site.status
    )
    db.add(db_site)
    db.commit()
    db.refresh(db_site)
    return db_site

def get_client_sites(db: Session, client_id: int):
    return db.query(models.Site).filter(models.Site.client_id == client_id).all()

def get_active_clients_count(db: Session):
    return db.query(models.Client).filter(models.Client.status == "Active").count()

def get_client_shifts(db: Session, client_id: int, date_from=None, date_to=None):
    query = db.query(models.Shift).filter(models.Shift.client_id == client_id)
    
    if date_from:
        query = query.filter(models.Shift.date >= date_from)
    
    if date_to:
        query = query.filter(models.Shift.date <= date_to)
    
    return query.all()

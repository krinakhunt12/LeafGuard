from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    diagnoses = relationship("Diagnosis", back_populates="owner")

class Diagnosis(Base):
    __tablename__ = "diagnoses"

    id = Column(Integer, primary_key=True, index=True)
    disease_name = Column(String, index=True)
    confidence = Column(Float)
    description = Column(String)
    treatments = Column(JSON)  # Store as a list of strings
    is_healthy = Column(Boolean)
    created_at = Column(DateTime, default=datetime.utcnow)
    image_path = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Set nullable=True for now to support anonymous users

    owner = relationship("User", back_populates="diagnoses")

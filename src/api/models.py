from turtle import title
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Float, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()

class User(db.Model):
    __tablename__= "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    address: Mapped[str] = mapped_column(nullable=True)
    phone: Mapped[str] = mapped_column(nullable=True)
    city: Mapped[str] = mapped_column(nullable=True)
    country: Mapped[str] = mapped_column(nullable=True)

    rooms: Mapped[list["Room"]] = relationship("Room", back_populates="host")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name, 
            "is_active": self.is_active,
            "address": self.address,
            "phone": self.phone,
            "city": self.city,
            "country": self.country,
            # do not serialize the password, its a security breach
        }
    
class Room(db.Model):
    __tablename__="room"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    photo_url: Mapped[str] = mapped_column(nullable=False)
    rules: Mapped[str] = mapped_column(nullable=True)
    capacity: Mapped[int] = mapped_column(nullable=False)
    price: Mapped[float] = mapped_column(nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "photo_url": self.photo_url,
            "rules": self.rules,
            "capacity": self.capacity,
            "price": self.price
        }
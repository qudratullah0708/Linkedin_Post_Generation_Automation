from sqlalchemy import Column, Integer, String, ForeignKey, CheckConstraint
from .database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column
from sqlalchemy.sql.sqltypes import Text







class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    posts = relationship("Posts", back_populates="creator")

class Posts(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    user_id = Column(Integer, ForeignKey("users.id"))
    creator = relationship("Users", back_populates="posts")

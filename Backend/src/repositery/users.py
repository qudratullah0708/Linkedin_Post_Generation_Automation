from ..schemas import UserSchema, ShowUserSchema
from .. import models
from fastapi import FastAPI, Depends, HTTPException,status
from sqlalchemy.orm import Session
from ..database import get_db
from ..hashing import Hash




def create(user_data, db: Session):
    hashed_password = Hash.becrypt(user_data["password"])  # Or however you hash
    new_user = models.Users(
        name=user_data["name"],
        email=user_data["email"],
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}


def show(id: int, db: Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")
    return user
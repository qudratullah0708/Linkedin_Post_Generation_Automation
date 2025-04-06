from ..schemas import UserSchema, ShowUserSchema
from .. import models
from fastapi import FastAPI, Depends, HTTPException,status
from sqlalchemy.orm import Session
from ..database import get_db
from ..hashing import Hash




def create(request: UserSchema, db: Session = Depends(get_db)):
    new_user = models.Users(name=request.name, email=request.email, password=Hash.becrypt(request.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def show(id: int, db: Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")
    return user
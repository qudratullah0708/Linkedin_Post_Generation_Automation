from fastapi import FastAPI, Depends, APIRouter, status, HTTPException
from sqlalchemy.orm import Session
from .. import models
from ..schemas import UserSchema, ShowUserSchema
from ..database import get_db, Base, engine
from ..hashing import Hash
from ..repositery import users
from .. import oauth2

from fastapi import Form



router = APIRouter(
    prefix="/users",
    tags=["users"]
)


Base.metadata.create_all(bind=engine)

@router.post("/register", status_code=200)
def createuser(
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    
    email = email.strip().lower()


    # Check if user already exists
    user = db.query(models.Users).filter(models.Users.email == email).first()
    if user:
        raise HTTPException(status_code=400, detail="User already exists")

    # You can pass these as a dict or use a Pydantic model internally
    user_data = {
        "name": name,
        "email": email,
        "password": password
    }

    return users.create(user_data, db)

@router.get("/{id}", response_model=ShowUserSchema)
def show(id: int, db: Session = Depends(get_db), current_user: UserSchema = Depends(oauth2.get_current_user)):
    return users.show(id, db)




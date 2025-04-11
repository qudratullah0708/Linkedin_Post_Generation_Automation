from fastapi import FastAPI, Depends, APIRouter, status, HTTPException
from sqlalchemy.orm import Session
from .. import models
from ..schemas import UserSchema, ShowUserSchema
from ..database import get_db, Base, engine
from ..hashing import Hash
from ..repositery import users
from .. import oauth2



router = APIRouter(
    prefix="/users",
    tags=["users"]
)


Base.metadata.create_all(bind=engine)


@router.post("/", status_code=200)
def createuser(request: UserSchema, db: Session = Depends(get_db), current_user: UserSchema = Depends(oauth2.get_current_user)):
    # Check if the user exists
    user = db.query(models.Users).filter(models.Users.id == request.user_id).first()
    if not user:
        raise HTTPException(status_code=400, detail="User does not exist")
    return users.create(request, db)

@router.get("/{id}", response_model=ShowUserSchema)
def show(id: int, db: Session = Depends(get_db), current_user: UserSchema = Depends(oauth2.get_current_user)):
    return users.show(id, db)




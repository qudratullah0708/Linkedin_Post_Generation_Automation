import models
from sqlalchemy.orm import Session
from schemas import UserSchema, ShowUserSchema
from fastapi import FastAPI, Depends, status, HTTPException
from database import get_db, Base, engine
from hashing import Hash



Base.metadata.create_all(bind=engine)


 
 #uvicorn repositery.users:app --reload

app = FastAPI()


@app.post("/createuser", status_code=200)
def createuser(request: UserSchema, db: Session = Depends(get_db)):
    new_user = models.Users(name=request.name, email=request.email, password=Hash.becrypt(request.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@app.get("/ShowUser/{id}", response_model=ShowUserSchema)
def show(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")
    return user




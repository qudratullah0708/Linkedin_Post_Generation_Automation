from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from .. import schemas, database, models, hashing, token_utils
from sqlalchemy.orm import Session

router = APIRouter(
   tags=["Authentication"]
)

@router.post('/login')
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db) ):
    user = db.query(models.Users).filter(models.Users.name == request.username).first()
    if not user: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Invalid Credentials")
    if not hashing.Hash.verify(user.password, request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Incorrect Password")
    
    # GENERATE THE JWT TOKEN
    #access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = token_utils.create_access_token(
        data={"sub": user.email}  #, expires_delta=access_token_expires
    )
    return {"access_token":access_token, "token_type":"bearer"}

 
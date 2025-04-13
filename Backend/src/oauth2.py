from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from . import token_utils, models
from .database import get_db
from sqlalchemy.orm import Session


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(db : Session=Depends(get_db),data: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # return token_utils.verify_token(data, credentials_exception)


    token_data = token_utils.verify_token(data, credentials_exception)
    user = db.query(models.Users).filter(models.Users.name == token_data.username).first()

    if user is None:
        raise credentials_exception

    return user  # ✅ returns full user object




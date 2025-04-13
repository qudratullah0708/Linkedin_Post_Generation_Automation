from fastapi import FastAPI, APIRouter, status, HTTPException, Depends
from ..database import get_db, engine, SessionLocal, Base
from sqlalchemy.orm import Session
from .. import models
from ..schemas import PostSchema, ShowPostSchema, UserSchema
from typing import List
from ..repositery import posts, users
from .. import oauth2


Base.metadata.create_all(engine) 



router = APIRouter(
    prefix="/posts",
    tags=["posts"]
)



@router.post("/", status_code=201)
def create_post(request:PostSchema, db : Session=Depends(get_db), current_user: UserSchema = Depends(oauth2.get_current_user)):
    
    return posts.create(request, current_user.id, db)
    

@router.get("/", response_model=List[ShowPostSchema])
def getposts(db:Session= Depends(get_db), current_user: UserSchema = Depends(oauth2.get_current_user)):
   
   return posts.getposts(current_user.id,db)


@router.get("/{id}", status_code=200, response_model=ShowPostSchema)
def showpost(id:int, db:Session=Depends(get_db), current_user: UserSchema = Depends(oauth2.get_current_user)):
    return posts.showpost(id, db)

@router.delete("/{id}", status_code=204)
def deletepost(id: int, db: Session = Depends(get_db), current_user: UserSchema = Depends(oauth2.get_current_user)):
    return posts.destroy(id, db)

@router.put("/{id}", status_code=200, response_model=ShowPostSchema)
def updatepost(id: int, request: PostSchema, db: Session = Depends(get_db), current_user: UserSchema = Depends(oauth2.get_current_user)):
   return posts.update(id, request,db)
 



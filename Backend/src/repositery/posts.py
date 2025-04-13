from ..schemas import PostSchema
from .. import models
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from ..database import get_db
# from . import post_content, posting_api


def create(request:PostSchema, user_id :int,db : Session=Depends(get_db)):

        new_post = models.Posts(title=request.title, content=request.content, user_id=user_id)
        db.add(new_post)
        db.commit()
        db.refresh(new_post)
        return new_post


def getposts(user_id: int, db: Session = Depends(get_db)):
   posts = db.query(models.Posts).filter(models.Posts.user_id == user_id).all()
   if not posts:
        return []  # Ensure an empty list is returned instead of None
   return posts
   

def showpost(id:int, db:Session=Depends(get_db)):
    post = db.query(models.Posts).filter(models.Posts.id==id).first()
    if not post:
            raise HTTPException(status_code=404,detail=f"Post with id {id} not found.")
    
    return post


def destroy(id: int, db: Session = Depends(get_db)):
    post = db.query(models.Posts).filter(models.Posts.id == id).first()
    if not post:
        raise HTTPException(status_code=404, detail=f"Post with id {id} not found.")
    
    db.delete(post)
    db.commit()
    return "Deleted Successfully"

def update(id: int, request: PostSchema, db: Session = Depends(get_db)):
    post = db.query(models.Posts).filter(models.Posts.id == id).first()
    if not post:
        raise HTTPException(status_code=404, detail=f"Post with id {id} not found.")
    
    for key, value in vars(request).items():
        setattr(post, key, value)  # Update fields dynamically
    
    db.commit()
    db.refresh(post)
    return post


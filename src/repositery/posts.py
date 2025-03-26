
import models
from sqlalchemy.orm import Session
from schemas import PostSchema, ShowPostSchema
import models
from fastapi import FastAPI, status, HTTPException , Depends
from database import get_db, Base, engine
from typing import List
from repositery.post_content import generatePost, RetrieveNews




Base.metadata.create_all(bind=engine)



app = FastAPI()

@app.post("/create", status_code=201)
def create_post(request:PostSchema, db : Session=Depends(get_db)):
    # Retrieve news and generate a LinkedIn post

    # uncomment these lines for production only

    # retrieved_content = RetrieveNews()
    # post_content = generatePost(retrieved_content)
    # new_post = models.Posts(content=post_content, user_id=request.user_id)


    new_post = models.Posts(content="This is the dummy content", user_id=request.user_id)

    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@app.get("/get", response_model=List[ShowPostSchema])
def getposts(db:Session= Depends(get_db)):
   posts = db.query(models.Posts).all()
   if not posts:
        return []  # Ensure an empty list is returned instead of None
   return posts


@app.get("/show/{id}", status_code=200, response_model=ShowPostSchema)
def showpost(id:int, db:Session=Depends(get_db)):
    post = db.query(models.Posts).filter(Posts.id==id).first()
    if not post:
            raise HTTPException(status_code=404,detail=f"Post with id {id} not found.")
    
    return post

@app.delete("/delete/{id}", status_code=204)
def deletepost(id: int, db: Session = Depends(get_db)):
    post = db.query(models.Posts).filter(models.Posts.id == id).first()
    if not post:
        raise HTTPException(status_code=404, detail=f"Post with id {id} not found.")
    
    db.delete(post)
    db.commit()
    return



def updatepost(id: int, request: PostSchema, db: Session = Depends(get_db)):
    post = db.query(models.Posts).filter(models.Posts.id == id).first()
    if not post:
        raise HTTPException(status_code=404, detail=f"Post with id {id} not found.")
    
    for key, value in vars(request).items():
        setattr(post, key, value)  # Update fields dynamically
    
    db.commit()
    db.refresh(post)
    return post
 



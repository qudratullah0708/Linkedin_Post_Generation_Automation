from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
from ..repositery.post_content import RetrieveNews, generatePost, EditPost  #

router = APIRouter(
   tags=["Generate Post"]
)

app = FastAPI()

class EditRequest(BaseModel):
    content: str

class TopicRequest(BaseModel):
    topic: str

# Define a response model
class PostContentResponse(BaseModel):   
    generated_post: str

@router.post("/generate_post", response_model=PostContentResponse)
async def generate_linkedin_post(request: TopicRequest):
    try:
        # Fetch the latest news
        news_content = RetrieveNews(request.topic)

        # Generate the LinkedIn post based on the news content
        post_content = generatePost(news_content, request.topic)

        # Return the generated post
        return PostContentResponse(generated_post=post_content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))





@router.post("/edit_post", response_model=PostContentResponse)
async def Edit_Linkedin_Post(request: EditRequest):
    try:
        # Generate the LinkedIn post based on the news content
        edited_content = EditPost(request.content)

        # Return the generated post
        return PostContentResponse(generated_post=edited_content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

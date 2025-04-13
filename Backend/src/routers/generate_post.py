from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
from ..repositery.post_content import RetrieveNews, generatePost  #

router = APIRouter(
   tags=["Generate Post"]
)

app = FastAPI()



# Define a response model
class PostContentResponse(BaseModel):
    generated_post: str

@router.get("/generate_post", response_model=PostContentResponse)
async def generate_linkedin_post():
    try:
        # Fetch the latest news
        news_content = RetrieveNews()

        # Generate the LinkedIn post based on the news content
        post_content = generatePost(news_content)

        # Return the generated post
        return PostContentResponse(generated_post=post_content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

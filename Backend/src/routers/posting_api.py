# from .post_content import RetrieveNews, generatePost
from fastapi import FastAPI, HTTPException, APIRouter
import requests
import os
from dotenv import load_dotenv
from ..repositery.post_content import RetrieveNews, generatePost

# Load environment variables
load_dotenv()

router = APIRouter(
    prefix = "/post_to_linkedin",
   tags=["Posting API"]
)

app = FastAPI()




LINKEDIN_API_URL = "https://api.linkedin.com/v2/ugcPosts"
ANYSHARE_API_KEY = os.getenv("ANYSHARE_API_KEY")

@router.post("/")
def post_to_linkedin():


    content = RetrieveNews()
    generated_post =   generatePost(content)


    payload = {'post': generated_post,
            'platforms': ['linkedin'],
    }
    headers = {'Content-Type': 'application/json',
            'Authorization': f'Bearer {ANYSHARE_API_KEY}'}

    print(headers)

    response = requests.post('https://api.ayrshare.com/api/post',
        json=payload,
        headers=headers)

    if response.status_code != 201:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    
    return {"message": "Post successfully created!", "response": response.json()}

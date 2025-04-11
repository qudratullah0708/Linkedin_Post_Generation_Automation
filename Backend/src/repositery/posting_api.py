# from .post_content import RetrieveNews, generatePost
from fastapi import FastAPI, HTTPException
import requests
import os
from dotenv import load_dotenv
# Load environment variables
load_dotenv()

app = FastAPI()

LINKEDIN_API_URL = "https://api.linkedin.com/v2/ugcPosts"

# Get API keys
ANYSHARE_API_KEY = os.getenv("ANYSHARE_API_KEY")

@app.post("/post-to-linkedin/")
def post_to_linkedin():


    # content = RetrieveNews()
    # generated_post =   generatePost(content)


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

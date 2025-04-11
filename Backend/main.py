from fastapi import FastAPI
from src.routers import posts, users, authentication

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(posts.router)
app.include_router(users.router)
app.include_router(authentication.router)



if __name__ == "__main__":
    main()

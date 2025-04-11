from fastapi import FastAPI
from src.routers import posts, users, authentication

app = FastAPI()


app.include_router(posts.router)
app.include_router(users.router)
app.include_router(authentication.router)



if __name__ == "__main__":
    main()

from pydantic import BaseModel, ConfigDict
from typing import List

# Schema for creating a new post
class PostSchema(BaseModel):
    content: str  
    user_id: int
    model_config = ConfigDict(from_attributes=True)

# Schema for creating a new user
class UserSchema(BaseModel):
    name: str
    email: str
    password: str  # Consider using SecretStr for security

# Base schema for displaying a user (excluding sensitive data like password)
class ShowUserSchemaBase(BaseModel):
    name: str
    email: str
    model_config = ConfigDict(from_attributes=True)

# Base schema for displaying a post
class PostSchemaBase(BaseModel):
    id: int
    content: str
    user_id: int
    model_config = ConfigDict(from_attributes=True)

# # Schema for displaying a post with creator details
# class ShowPostSchema(PostSchemaBase):
    
#     creator: ShowUserSchemaBase
#     model_config = ConfigDict(from_attributes=True)

from pydantic import BaseModel
from typing import Optional

class ShowPostSchema(BaseModel):
    id: int
    content: str
    user_id: int  # Ensure this field is always populated
    creator: Optional[ShowUserSchemaBase] = None  # Allow None if it's not included

    class Config:
        from_attributes = True  # Ensures ORM data is converted properly

# Schema for displaying a user with their posts
class ShowUserSchema(BaseModel):
    name: str
    email: str
    posts: List[ShowPostSchema] = []  # Default to an empty list if no posts exist
    model_config = ConfigDict(from_attributes=True)

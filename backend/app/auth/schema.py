from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    fullname: str = Field(..., example="user")
    email: EmailStr = Field(..., example="user@gmail.com")
    password: str = Field(
        min_length=8,
        max_length=255,
    )

class UserLogin(BaseModel):
    email: EmailStr = Field(..., example="user@gmail.com")
    password: str = Field(
        min_length=8,
        max_length= 225,
    )
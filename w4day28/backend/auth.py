from datetime import datetime, timedelta
from jose import jwt, JWTError
from dotenv import load_dotenv
import os
from fastapi import HTTPException

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS"))
print("Auth Config:", ACCESS_TOKEN_EXPIRE_MINUTES, "   ",REFRESH_TOKEN_EXPIRE_DAYS)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    generated_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    print("Generated Access Token:", generated_token)
    return  generated_token

from pydantic import BaseModel

class RefreshRequest(BaseModel):
    refresh_token: str

# @app.post("/refresh")
async def refresh_token(data: RefreshRequest):
    token = data.refresh_token
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    new_token = create_access_token({"sub": payload["sub"]})
    return {"access_token": new_token}



def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    


def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    generated_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    print("Generated Refresh Token:", generated_token)
    return generated_token

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
from fastapi import Body
from db import db,USER_COLLECTION,CONTACT_COLLECTION,HITS_COLLECTION,TEMPLATES_COLLECTION
from utils import serialize_doc



app = FastAPI()

# Allow frontend (React) requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict later to "http://localhost:3000"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "FastAPI backend is running!"}

@app.get("/gettasks")
def get_tasks():
    print(f"All task are Return Backed✅✅✅")
    return "ok"

# Example: fetch a user
@app.get("/users/{email}")
async def get_user(email: str):
    user = await USER_COLLECTION.find_one({"email": email})
    if user:
        return serialize_doc(user)
    return {"message": "User not found"}

@app.get("/getallusers")
async def get_all_users():
    cursor = USER_COLLECTION.find({})
    users = await cursor.to_list(length=None)
    # serialize all documents recursively
    serialized_users = [serialize_doc(user) for user in users]
    return {"users": serialized_users}

@app.get("/getremplates")
async def get_all_templates():
    cursor = TEMPLATES_COLLECTION.find({})
    templates = await cursor.to_list(length=None)
    # serialize all documents recursively
    serialized_template = [serialize_doc(template) for template in templates]
    return {"templates": serialized_template}

@app.post("/login/{email}/{password}")
async def login(email: str, password: str):
    user = await USER_COLLECTION.find_one({"email": email, "password_hash": password})
    if not user:
        return {"message": "Invalid credentials"}
    else:
        user=serialize_doc(user)
    return {"User": user,"message": "Login successful"}

@app.post("/register/{email}/{password}/{name}/{sex}")
async def register_user(email: str, password: str, name: str, sex: str):
    print(f"{email} {password} {name} {sex}")
    if not email or not password or not name or not sex:
        return {"message": "All fields are required"}
    existing_user = await USER_COLLECTION.find_one({"email": email})
    if existing_user:
        return {"message": "User already exists"}
    if len(password) < 6:
        return {"message": "Password must be at least 6 characters long"}
    if not email.endswith("@gmail.com") and not email.count("@") == 1:
        return {"message": "Invalid email format"}
    else:
        user_data = {
            "email": email,
            "password_hash": password,
            "name": name,
            "sex": sex,
        }
        await USER_COLLECTION.insert_one(user_data)
        

    return {"message": "User registered successfully"}
    # user = await USER_COLLECTION.find_one({"email": email, "password_hash": password})
    # if not user:
    #     return {"message": "Invalid credentials"}
    # else:
    #     user=serialize_doc(user)
    # return {"User": user,"message": "Login successful"}


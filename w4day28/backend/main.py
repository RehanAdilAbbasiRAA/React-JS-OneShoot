from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from typing import Dict
from fastapi import Body
from db import db,USER_COLLECTION,CONTACT_COLLECTION,HITS_COLLECTION,TEMPLATES_COLLECTION
from utils import serialize_doc
from auth import create_access_token, create_refresh_token, verify_token
from bson.objectid import ObjectId
from hash_password import hash_password



oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
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

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    print(payload,"Current User Payload")
    if not payload:
        print("Invalid or expired token")
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload

@app.post("/login/{email}/{password}")
async def login(email: str, password: str):
    user = await USER_COLLECTION.find_one({"email": email, "password_hash": password})
    if not user:
        return {"message": "Invalid credentials"}

    user = serialize_doc(user)
    access_token = create_access_token({"sub": user["email"]})
    refresh_token = create_refresh_token({"sub": user["email"]})
    print(user)
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": user,
        "email": user["email"],
        "name": user["display_name"],
        "user_id": str(user["_id"]),
        "token_type": "bearer",
        "message": "Login successful"
    }
# @app.post("/refresh")
# async def refresh_token(refresh_token: str = Body(...)):
#     payload = verify_token(refresh_token)
#     if not payload:
#         raise HTTPException(status_code=401, detail="Invalid refresh token")
#     email = payload.get("sub")
#     new_access_token = create_access_token({"sub": email})
#     return {"access_token": new_access_token}

from pydantic import BaseModel

class RefreshRequest(BaseModel):
    refresh_token: str

@app.post("/refresh")
async def refresh_token(data: RefreshRequest):
    payload = verify_token(data.refresh_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    email = payload.get("sub")
    new_access_token = create_access_token({"sub": email})
    return {"access_token": new_access_token}


@app.get("/protected")
async def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": f"Welcome {current_user['sub']}! You’re authorized."}

@app.get("/user/profile/{user_id}")
async def get_setting(user_id: str,token: str = Depends(get_current_user)):
    print(user_id)
    user_id=ObjectId(user_id)
    user=await USER_COLLECTION.find_one({"_id": user_id})
    if not user:
        print("User not found")
        return {"message": "User not found"}
    user_doc= serialize_doc(user)
    # print(user_doc,"Data we get")
    return {"name":user_doc["display_name"],"email":user_doc["email"],
            # "password":user_doc["password_hash"]
            "avatar":user_doc["avatar_url"]
            }


@app.post("/user/profile/{user_id}")
async def update_user_profile(user_id: str, data: dict = Body(...)):
    user_id = ObjectId(user_id)
    update_data = {}
    if "name" in data:
        update_data["display_name"] = data["name"]
    if "email" in data:
        update_data["email"] = data["email"]
    if "avatar" in data:
        update_data["avatar_url"] = data["avatar"]
    if "password" in data:
        # update_data["password_hash"] = hash_password(data["password"])  # hash function
        update_data["password_hash"] = data["password"]

    result = await USER_COLLECTION.update_one({"_id": user_id}, {"$set": update_data})
    print(f" data Updated in DB ✅✅✅ {update_data}")
    return {"success": result.modified_count == 1}



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

# @app.post("/login/{email}/{password}")
# async def login(email: str, password: str):
#     user = await USER_COLLECTION.find_one({"email": email, "password_hash": password})
#     if not user:
#         return {"message": "Invalid credentials"}
#     else:
#         user=serialize_doc(user)
#     return {"User": user,"message": "Login successful"}

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


@app.get("/getuserInfo/{email}")
async def get_user_info(email: str):
    user = await USER_COLLECTION.find_one({"email": email})
    if not user:
        return {"message": "User not found"}
    user_doc= serialize_doc(user)
    # print(user_doc,"Data we get")
    print(email,"Data we get")
    data={"name":user_doc["display_name"],
            "title":user_doc["title"],
            "avatar":user_doc["avatar_url"],
            "intro":user_doc["bio"],
            "socialLinks":user_doc["social_links"]
            }
    # print(data,"Data we send")
    return data

@app.get("/getUserProjects/{email}")
async def get_user_projects(email: str):
    user = await USER_COLLECTION.find_one({"email": email})
    if not user:
        return {"message": "User not found"}
    user_doc= serialize_doc(user)
    print(f"User Projects fetched for {email} ✅✅✅ {len(user_doc["projects"])}")
    data=user_doc["projects"]
    # print(data,"Data we get")
    return data



@app.get("/getUserTemplates/{email}")
async def get_user_templates(email: str):
    user = await USER_COLLECTION.find_one({"email": email})
    if not user:
        return {"message": "User not found"}
    user_doc = serialize_doc(user)
    template_ids = user_doc.get("stats", {}).get("templates_clipped", [])
    print("User clipped templates:", template_ids)

    # Convert to ObjectId
    object_ids = [ObjectId(tid) for tid in template_ids]

    # SINGLE BULK QUERY
    cursor = TEMPLATES_COLLECTION.find({ "_id": { "$in": object_ids } })
    templates = await cursor.to_list(length=None)
    # Serialize
    templates = [serialize_doc(t) for t in templates]
    # print("Fetched templates:", len(templates) ,"templates " , templates)

    # Build a clean minimal response
    response = []
    for t in templates:
        response.append({
            "id": str(t.get("_id")),
            "name": t.get("name"),
            "views": t.get("stats", {}).get("views", 0),
            "image": t.get("preview_image")
        })

    return response

@app.get("/getUserStats/{email}")
async def get_user_stats(email: str):
    user = await USER_COLLECTION.find_one({"email": email})
    if not user:
        return {"message": "User not found"}

    user_doc = serialize_doc(user)
    template_ids = user_doc.get("stats", {}).get("templates_clipped", [])

    object_ids = [ObjectId(t) for t in template_ids]

    cursor = TEMPLATES_COLLECTION.find({ "_id": { "$in": object_ids } })
    templates = await cursor.to_list(length=None)
    templates = [serialize_doc(t) for t in templates]

    total_views = sum(t.get("stats", {}).get("views", 0) for t in templates)
    # print("Total views:", total_views)
    # print("Template count:", len(templates))

    return {
        "templateCount": len(templates),
        "totalViews": total_views
    }


@app.get("/getAllTemplates")
async def get_all_templates():
    cursor = TEMPLATES_COLLECTION.find({})
    templates = await cursor.to_list(length=None)
    # serialize all documents recursively
    serialized_template = [serialize_doc(template) for template in templates]
    print("Total templates fetched:", len(serialized_template), "templates", serialized_template)
    return serialized_template


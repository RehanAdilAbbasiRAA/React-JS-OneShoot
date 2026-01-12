from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from typing import Dict
from fastapi import Body
from db import db,USER_COLLECTION,CONTACT_COLLECTION,HITS_COLLECTION,TEMPLATES_COLLECTION,PROJECTS
from utils import serialize_doc
from auth import create_access_token, create_refresh_token, verify_token
from bson.objectid import ObjectId
from hash_password import hash_password
from fastapi import Request
from datetime import datetime
import uuid
import base64
from pathlib import Path
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel




oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app = FastAPI()

UPLOAD_DIR = Path("uploads/projects")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
# Means:
# /uploads/projects/xyz.png becomes accessible via browser
# React can directly load images

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
    # print(user)
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

@app.get("/getUser/profile/{user_id}")
async def get_setting(user_id: str,token: str = Depends(get_current_user)):
    # print(user_id)
    print("User Hit Profile Endpoint✅✅✅")
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


@app.post("/setUser/profile/{user_id}")
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
        update_data["password_hash"] = data["password"]

    result = await USER_COLLECTION.update_one({"_id": user_id}, {"$set": update_data})
    
    # ✅ FIX: Get the UPDATED user data from database
    updated_user = await USER_COLLECTION.find_one({"_id": user_id})
    
    if updated_user:
        user_doc = serialize_doc(updated_user)
        return {
            "success": result.modified_count == 1,
            "name": user_doc["display_name"],
            "email": user_doc["email"],
            "avatar": user_doc["avatar_url"]
        }
    else:
        return {"success": False, "message": "User not found"}



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
    print("User Hit Get User Info Endpoint✅✅✅")
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

@app.get("/getUserProjects/{user_id}")
async def get_user_projects(user_id: str):
    print(f"User Hit Get Projects Endpoint✅✅✅ {user_id}")
    user = await PROJECTS.find({"user_id": ObjectId(user_id)}).to_list(length=None)
    if not user:
        return []
    listOfProjects=[]
    for project in user:
        listOfProjects.append(serialize_doc(project))
    
        # raise HTTPException(status_code=404, detail=f"Projects not found for user {user_id}")
    # user_doc= serialize_doc(user)
    # print(f"User has these Projects {user_doc}")
    # print(f"User Projects fetched for {email} ✅✅✅ {len(user_doc["projects"])}")
    # data=user_doc["projects"]
    # # print(data,"Data we get")
    return listOfProjects



@app.get("/getUserTemplates/{email}")
async def get_user_templates(email: str):
    print("User Hit Get User Templates Endpoint✅✅✅")
    user = await USER_COLLECTION.find_one({"email": email})
    if not user:
        return {"message": "User not found"}
    user_doc = serialize_doc(user)
    template_ids = user_doc.get("stats", {}).get("templates_clipped", [])
    # print("User clipped templates:", template_ids)

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
    print("User Hit Get User Stats Endpoint✅✅✅")
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

@app.post("/user/addProject")
async def add_project(request: Request):
    data = await request.json()
    
    user_id = data.get("user_id")
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID is required")
    
    # Find user
    # user = await USER_COLLECTION.find_one({"email": email})
    # if not user:
    #     raise HTTPException(status_code=404, detail="User not found")
    # user = serialize_doc(user)
    
    # Process and validate data
    project = {}

    # Required fields
    project["user_id"] = ObjectId(user_id)
    # project["project_id"] = ObjectId()  # generate unique id
    project["name"] = data.get("name", "")
    project["summary"] = data.get("summary", "")

    # Date validation
    start_date = data.get("startDate")
    end_date = data.get("endDate")
    if start_date and end_date:
        start_dt = datetime.strptime(start_date, "%Y-%m-%d")
        end_dt = datetime.strptime(end_date, "%Y-%m-%d")
        if start_dt > end_dt:
            raise HTTPException(status_code=400, detail="Start date cannot be after end date")
        project["duration"] = {"from": start_date, "to": end_date}
    else:
        project["duration"] = {"from": None, "to": None}

    # Arrays
    project["technologies"] = data.get("technologies", [])
    project["databases"] = data.get("databases", [])

    # Languages: split by comma if received as string
    languages = data.get("languages", [])
    if isinstance(languages, str):
        languages = [lang.strip() for lang in languages.split(",") if lang.strip()]
    project["languages"] = languages

    # Images
    project["images"] = data.get("images", [])

    # Inside add_project, after project["images"] = data.get("images", []) loop for images to store them in path we used at top
    images = data.get("images", [])
    print("IMAGES TYPE:", type(images))
    print("IMAGES LENGTH:", len(images))
    saved_files = []

    for img in images:
        # print("Processing image:", img)
        try:
            saved_files.append(save_image_from_base64(img))
        except Exception as e:
            print("Failed to save image:", e)

    project["images"] = saved_files

    # Links and type
    project["github"] = data.get("github", "")
    project["liveURL"] = data.get("liveURL", "")
    project["linkedIn"] = data.get("linkedIn", "")
    project["type"] = data.get("type", "")
    project["createdAt"] = datetime.now().isoformat()
    project["updatedAt"] = datetime.now().isoformat()


    # Append to user's projects
    # updated_projects = user.get("projects", [])
    # updated_projects.append(project)

    await PROJECTS.insert_one(project)

    return {"message": "Project added successfully"}

@app.put("/user/updateProject/{user_id}/{project_id}")
async def update_project(user_id: str, project_id: str, request: Request):
    payload = await request.json()
    existing_images = []

    if "images" in payload:
        project = await PROJECTS.find_one(
            {"user_id": ObjectId(user_id),"_id": ObjectId(project_id)})

        if not project:
            raise HTTPException(status_code=404, detail="User not found")

        existing_images = project.get("images", [])

    # Prepare update fields for $set
    update_fields = {}

    if ("startDate" in payload) ^ ("endDate" in payload):
        raise HTTPException(
            status_code=400,
            detail="Both startDate and endDate must be provided together"
        )
    
    for key, value in payload.items():
        if key == "startDate" or key == "endDate":
            start_date = payload.get("startDate")
            end_date = payload.get("endDate")

            if start_date and end_date:
                start_dt = datetime.strptime(start_date, "%Y-%m-%d")
                end_dt = datetime.strptime(end_date, "%Y-%m-%d")

                if start_dt > end_dt:
                    raise HTTPException(status_code=400, detail="Start date cannot be after end date")

                update_fields["duration"] = {
                    "from": start_date,
                    "to": end_date
                }

            continue

        if key == "languages":
            if isinstance(value, str):
                value = [x.strip() for x in value.split(",") if x.strip()]
            update_fields["languages"] = value
            continue
        # images = payload.get("images", [])
        # print("IMAGES TYPE:", type(images))
        # print("IMAGES LENGTH:", len(images))

        # Inside the loop of payload items
        if key == "images":
            saved_files = []
            print("Updating images...") 
            for img in value:
                # print("Processing image:", img)
                try:
                    saved_files.append(save_image_from_base64(img))
                except Exception as e:
                    print("Failed to save image:", e)
            update_fields["images"] = saved_files
            continue


        # normal fields go directly inside the project
        update_fields[f"{key}"] = value

    # Execute update using positional operator
    result = await PROJECTS.update_one(
        {
            "user_id": ObjectId(user_id),
            "_id": ObjectId(project_id)
        },
        {
            "$set": update_fields
        }
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found or wrong project ID")

    if existing_images:
        data=await delete_previous_images(existing_images)
        if data.get("success"):
            print("Previous images cleared from DB. 👿👿")
        else:
            print("No previous images to clear or error occurred. 👿👿")

    return {"message": "Project updated successfully"}

def save_image_from_base64(base64_str: str) -> str:
    """
    Save base64 image to UPLOAD_DIR and return file path.
    """
    if "," in base64_str:
        header, base64_data = base64_str.split(",", 1)
    else:
        base64_data = base64_str
    file_ext = header.split("/")[1].split(";")[0] if 'header' in locals() else "png"
    filename = f"{uuid.uuid4()}.{file_ext}"
    file_path = UPLOAD_DIR / filename
    with open(file_path, "wb") as f:
        f.write(base64.b64decode(base64_data))
    return str(file_path)


@app.delete("/user/deleteProject/{project_id}/{user_id}")
async def delete_user_project(project_id: str, user_id: str):
    print(f"User Hit Delete Project Endpoint ✅ {project_id} {user_id}")

    # 1️⃣ Find the project (single document)
    project = await PROJECTS.find_one({
        "_id": ObjectId(project_id),
        "user_id": ObjectId(user_id)
    })

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found for this user"
        )

    # 2️⃣ Delete images from local storage
    images = project.get("images", [])
    await delete_previous_images(images)

    # 3️⃣ Delete project document
    await PROJECTS.delete_one({
        "_id": ObjectId(project_id),
        "user_id": ObjectId(user_id)
    })

    return {
        "success": True,
        "message": "Project deleted successfully"
    }

@app.get("/user/project/{user_id}/{project_id}")
async def get_user_project(user_id: str, project_id: str):
    print("PROJECT    ?????",user_id, project_id)
    project= await PROJECTS.find_one({"user_id": ObjectId(user_id), "_id": ObjectId(project_id)})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    project=serialize_doc(project)

    return {
        "success": True,
        "message": "Project fetched successfully",
        "project": project
    }




async def delete_previous_images(images: list):

    BASE_UPLOAD_DIR = UPLOAD_DIR.resolve()  # use the same directory you already have

    for img in images:
        try:
            if not isinstance(img, str):
                continue

            # Normalize Windows / Unix paths safely
            file_path = Path(img).resolve()

            print("Resolved file path:", file_path)

            # Safety check: only delete inside uploads/projects
            if BASE_UPLOAD_DIR not in file_path.parents and file_path != BASE_UPLOAD_DIR:
                print("Skipping non-upload file:", file_path)
                continue

            if file_path.exists():
                file_path.unlink()
                print("Deleted image:", file_path)
            else:
                print("File not found:", file_path)

        except Exception as e:
            print("Failed to delete image:", img, e)

    return {"success":True,"message": "Images cleared successfully"}
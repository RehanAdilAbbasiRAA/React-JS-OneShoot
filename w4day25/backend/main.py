from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from TaskData import tasks
from typing import Dict
from fastapi import Body


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
    return tasks

@app.put("/updatetask/{id}")
def update_task(id: int, new_data: Dict = Body(...)):
    for index, task in enumerate(tasks):
        if task["id"] == id:
            tasks[index]["title"] = new_data.get("title", task["title"])
            print(f"Task Updated Successfully ✅ {id}")
            return {"message": "Task Updated", "task": tasks[index]}

    return {"error": "Task Not Found"}, 404

@app.delete("/deltask/{id}")
def get_tasks(id: int):
    for index,task in enumerate(tasks):
        if task["id"] == id:
            tasks.pop(index)
    print(f"Task Deleted Sucessfully✅✅✅ {id}")
    return tasks

@app.post("/addtask")
def get_tasks(task: Dict):
    new_task = {
        "id": len(tasks) + 1,
        "title": task["title"],
        "description": "Mind your Business",
        "completed": False
    }
    tasks.append(new_task)
    print(f"Task Added Successfully ✅")
    return {"message": "Task Added Successfully ✅"}


@app.post("/signup")
async def signup(data: Request):
    body = await data.json()
    name = body.get("name")
    password = body.get("pass")
    
    # Here you could store it in DB, etc.
    print(f"Received signup: {name}, {password}")
    
    # Basic check just for example
    if password == "123456":
        return {"status": "error", "message": "Password too weak!"}
    else:
        return {"status": "success", "message": "Signup successful!", "data": body}

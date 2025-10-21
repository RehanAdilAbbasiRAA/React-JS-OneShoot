from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

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

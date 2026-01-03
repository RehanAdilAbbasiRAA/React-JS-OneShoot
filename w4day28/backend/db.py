# db.py
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("DB_URI")
DB_NAME = os.getenv("DB_NAME")
print(f" {MONGO_URI}     {DB_NAME}")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

# Collections
USER_COLLECTION = db["Users"]
CONTACT_COLLECTION = db["Contact"]
HITS_COLLECTION = db["Hits"]
TEMPLATES_COLLECTION = db["Templates"]
PROJECTS=db["Projects"]


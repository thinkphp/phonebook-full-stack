from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "phonebook_db")

app = FastAPI(title="PhoneBook API")

# Permite request-uri din frontend (React dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in productie, inlocuieste cu domeniul frontend-ului
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
contacts_collection = db["contacts"]


# ---------- Modele Pydantic ----------

class ContactIn(BaseModel):
    name: str = Field(..., min_length=1)
    phone: str = Field(..., min_length=1)
    email: Optional[str] = None
    address: Optional[str] = None


class ContactOut(ContactIn):
    id: str


def contact_helper(doc) -> dict:
    return {
        "id": str(doc["_id"]),
        "name": doc.get("name"),
        "phone": doc.get("phone"),
        "email": doc.get("email"),
        "address": doc.get("address"),
    }


# ---------- Endpoint-uri ----------

@app.get("/")
async def root():
    return {"status": "PhoneBook API ruleaza"}


@app.get("/contacts", response_model=list[ContactOut])
async def get_contacts(search: Optional[str] = None):
    query = {}
    if search:
        query = {
            "$or": [
                {"name": {"$regex": search, "$options": "i"}},
                {"phone": {"$regex": search, "$options": "i"}},
            ]
        }
    contacts = []
    async for doc in contacts_collection.find(query).sort("name", 1):
        contacts.append(contact_helper(doc))
    return contacts


@app.get("/contacts/{contact_id}", response_model=ContactOut)
async def get_contact(contact_id: str):
    if not ObjectId.is_valid(contact_id):
        raise HTTPException(status_code=400, detail="ID invalid")
    doc = await contacts_collection.find_one({"_id": ObjectId(contact_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Contact negasit")
    return contact_helper(doc)


@app.post("/contacts", response_model=ContactOut, status_code=201)
async def create_contact(contact: ContactIn):
    result = await contacts_collection.insert_one(contact.model_dump())
    doc = await contacts_collection.find_one({"_id": result.inserted_id})
    return contact_helper(doc)


@app.put("/contacts/{contact_id}", response_model=ContactOut)
async def update_contact(contact_id: str, contact: ContactIn):
    if not ObjectId.is_valid(contact_id):
        raise HTTPException(status_code=400, detail="ID invalid")
    result = await contacts_collection.update_one(
        {"_id": ObjectId(contact_id)}, {"$set": contact.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact negasit")
    doc = await contacts_collection.find_one({"_id": ObjectId(contact_id)})
    return contact_helper(doc)


@app.delete("/contacts/{contact_id}", status_code=204)
async def delete_contact(contact_id: str):
    if not ObjectId.is_valid(contact_id):
        raise HTTPException(status_code=400, detail="ID invalid")
    result = await contacts_collection.delete_one({"_id": ObjectId(contact_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact negasit")
    return None

# utils.py
from bson import ObjectId
from datetime import datetime

def serialize_doc(doc):
    """
    Recursively convert MongoDB document to JSON-serializable dict.
    - Converts ObjectId to str
    - Converts datetime to ISO format string
    - Handles nested dicts and lists
    """
    if isinstance(doc, ObjectId):
        return str(doc)
    elif isinstance(doc, datetime):
        return doc.isoformat()
    elif isinstance(doc, dict):
        return {k: serialize_doc(v) for k, v in doc.items()}
    elif isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    else:
        return doc

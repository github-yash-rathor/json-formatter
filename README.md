from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS middleware to allow frontend requests
app.add_middleware(
CORSMiddleware,
allow_origins=["*"],  # Update this to specific domains if needed
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

class JsonInput(BaseModel):
json_string: str

@app.post("/format-json")
def format_json(data: JsonInput):
try:
parsed_json = json.loads(data.json_string)
formatted_json = json.dumps(parsed_json, indent=4)
return {"formatted_json": formatted_json}
except json.JSONDecodeError:
raise HTTPException(status_code=400, detail="Invalid JSON")

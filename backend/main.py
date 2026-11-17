import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sample API")

frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/items")
def get_items():
    return {
        "items": [
            {"id": 1, "name": "りんご", "description": "赤い果物です"},
            {"id": 2, "name": "みかん", "description": "冬においしい果物です"},
            {"id": 3, "name": "ぶどう", "description": "小さな実が集まった果物です"},
        ]
    }


@app.get("/health")
def health():
    return {"status": "ok"}

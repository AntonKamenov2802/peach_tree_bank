from api.routes import authotization, transactions
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    root_path="/api/v1"
)
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://back-end:8080"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(authotization.router)
app.include_router(transactions.router)



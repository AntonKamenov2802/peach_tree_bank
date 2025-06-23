from api.routes import authotization, transactions
from fastapi import FastAPI

app = FastAPI(
    root_path="/api/v1"
)
app.include_router(authotization.router)
app.include_router(transactions.router)



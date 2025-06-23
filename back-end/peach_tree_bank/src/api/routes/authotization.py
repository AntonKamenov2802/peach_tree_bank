from uuid import UUID

from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from database.utils import get_db_session
from database.models import User
from api.utils import generate_authorization_token


class AuthToken(BaseModel):
    token: UUID


router = APIRouter(
    tags=["Authorization"]
)


@router.post("/authenticate")
def authenticate_with_username_and_password(user: User, session: Session = Depends(get_db_session)) -> AuthToken:
    users = session.exec(select(User).where(User.username == user.username)).all()
    if len(users) == 1 and users[0].password == user.password:
        token = generate_authorization_token(users[0])
        return AuthToken(token=token)

    raise HTTPException(status_code=401, detail="Incorect username or password")

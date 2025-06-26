from uuid import UUID

from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from sqlalchemy.exc import NoResultFound

from database.utils import get_db_session
from database.models import User
from api.utils import generate_authorization_token


class AuthToken(BaseModel):
    token: UUID


router = APIRouter(
    tags=["Authorization"]
)


@router.post("/login")
def authenticate_with_username_and_password(user: User, session: Session = Depends(get_db_session)) -> AuthToken:
    try:
        user = session.exec(select(User).where(User.username == user.username)).one()
        if user.password == user.password:
            token = generate_authorization_token(user)
            return AuthToken(token=token)

        raise HTTPException(status_code=401, detail="Incorect username or password")

    except NoResultFound:
        raise HTTPException(status_code=401, detail="Incorect username or password")


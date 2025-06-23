from typing import Annotated
from uuid import UUID, uuid4

from fastapi import HTTPException
from fastapi.security import OAuth2AuthorizationCodeBearer

from database.models import User


oath2_scheme = OAuth2AuthorizationCodeBearer(tokenUrl="token", authorizationUrl="authenticate")

# I decided to skip the authorization part
# in this project and instead create a 
# very primitive authorization technique.
fake_auth_token_cache: dict[UUID, User] = {}


def is_authorized(authorization: Annotated[UUID, oath2_scheme]) -> User | None:
    user = fake_auth_token_cache.get(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized! Please log-in with username and password.")
    return user


def generate_authorization_token(user: User) -> UUID:
    for (token, cached_user) in fake_auth_token_cache.items():
        if user == cached_user:
            return token

    token = uuid4()
    fake_auth_token_cache[token] = user
    return token
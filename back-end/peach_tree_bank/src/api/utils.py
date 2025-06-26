from uuid import UUID, uuid4

from fastapi import HTTPException, Depends
from fastapi.security.api_key import APIKeyHeader

from database.models import User


api_key_header= APIKeyHeader(name="Authorization")

# I decided to skip the authorization part
# in this project and instead create a 
# very primitive authorization technique.
fake_auth_token_cache: dict[UUID, User] = {}


def is_authorized(authorization: UUID = Depends(api_key_header)) -> User | None:
    user = fake_auth_token_cache.get(UUID(authorization))
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
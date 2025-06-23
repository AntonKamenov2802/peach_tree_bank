import os
from typing import Generator

from sqlmodel import Session, create_engine

postgres_user = os.getenv("POSTGRES_USER")
postgres_password = os.getenv("POSTGRES_PASSWORD")
postgres_schema = os.getenv("POSTGRES_DB")


SQLALCHEMY_DATABASE_URL = f"postgresql://{postgres_user}:{postgres_password}@database/{postgres_schema}"
engine = create_engine(SQLALCHEMY_DATABASE_URL)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session
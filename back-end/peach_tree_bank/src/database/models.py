from uuid import UUID, uuid4
from datetime import datetime

from database.utils import engine
from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    id: UUID | None = Field(default_factory=uuid4, primary_key=True, index=True)
    username: str
    password: str

    transactions: list['Transaction'] = Relationship(back_populates="user")


class Transaction(SQLModel, table=True):
    id: UUID | None = Field(default_factory=uuid4, primary_key=True, index=True)
    date: datetime
    amount: float
    recipient: str
    type: int
    state: int

    user_id: UUID  = Field(foreign_key="user.id")
    user: User = Relationship(back_populates="transactions")


SQLModel.metadata.create_all(engine)
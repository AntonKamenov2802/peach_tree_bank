from enum import Enum
from uuid import UUID, uuid4
from datetime import datetime

from database.utils import engine
from sqlmodel import Column, Field, Relationship, SQLModel, Integer


class User(SQLModel, table=True):
    id: UUID | None = Field(default_factory=uuid4, primary_key=True, index=True)
    username: str = Field(index=True, unique=True)
    password: str

    transactions: list['Transaction'] = Relationship(back_populates="user")


class TransactionState(int, Enum):
    SEND = 1
    RECIEVED = 2
    PAYED = 3


class TransactionType(int, Enum):
    CARD_PAYEMENT = 1
    ONLINE_TRANSFER = 2
    TRANSACTION = 3


class Transaction(SQLModel, table=True):
    id: UUID | None = Field(default_factory=uuid4, primary_key=True, index=True)
    date: datetime
    amount: float
    recipient: str
    type: TransactionType = Field(sa_column=Column(Integer))
    state: TransactionState = Field(sa_column=Column(Integer))

    user_id: UUID  = Field(foreign_key="user.id", exclude=True)
    user: User = Relationship(back_populates="transactions")


SQLModel.metadata.create_all(engine)
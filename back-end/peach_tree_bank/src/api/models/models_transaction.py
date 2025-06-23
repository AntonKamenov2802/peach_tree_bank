from pydantic import BaseModel

from database.models import TransactionState


class TransactionPatch(BaseModel):
    state: TransactionState
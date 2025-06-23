from uuid import UUID

from sqlmodel import Session, select
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import NoResultFound

from api.utils import is_authorized
from api.models.models_transaction import TransactionPatch
from database.utils import get_db_session
from database.models import Transaction, User


router = APIRouter(
    tags=["Transactions"],
)


@router.get("/transactions")
def get_all_transactions(db_session: Session = Depends(get_db_session), user: User = Depends(is_authorized)) -> list[Transaction]:
    user_transactions = db_session.exec(select(Transaction).where(Transaction.user_id == user.id)).all()
    return user_transactions


@router.get("/transaction/{transaction_id}")
def get_transaction(transaction_id: UUID, db_session: Session = Depends(get_db_session), user: User = Depends(is_authorized)) -> Transaction:
    return _get_transaction_from_db(transaction_id, db_session, user)



@router.post("/transaction", status_code=201)
def create_new_transaction(new_transaction: Transaction, db_session: Session = Depends(get_db_session), user: User = Depends(is_authorized)) -> Transaction:
    new_transaction.user_id = user.id
    db_session.add(new_transaction)
    db_session.commit()
    db_session.refresh(new_transaction)
    return new_transaction


@router.patch("/transaction/{transaction_id}")
def patch_transaction(transaction_id: UUID, transaction_patch: TransactionPatch, db_session: Session = Depends(get_db_session), user: User = Depends(is_authorized)) -> TransactionPatch:
    transaction = _get_transaction_from_db(transaction_id, db_session, user)

    transaction.state = transaction_patch.state

    db_session.add(transaction)
    db_session.commit()
    db_session.refresh(transaction)

    return TransactionPatch(state=transaction.state)


def _get_transaction_from_db(transaction_id: UUID, db_session: Session, user: User) -> Transaction:
    try:
        transaction = db_session.exec(select(Transaction).where(Transaction.id == transaction_id)).one()
    except NoResultFound:
        raise HTTPException(status_code=404, details="Transaction not fount.")

    if transaction.user_id != user.id:
        raise HTTPException(status_code=401, details="You do not have permission to view this transaction.")

    return transaction
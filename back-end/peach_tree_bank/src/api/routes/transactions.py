from sqlmodel import Session, select
from fastapi import APIRouter, Depends

from api.utils import is_authorized
from database.utils import get_db_session
from database.models import Transaction, User


router = APIRouter(
    tags=["Transactions"],
)


@router.get("/transactions")
def get_all_transactions(db_session: Session = Depends(get_db_session), user: User = Depends(is_authorized)) -> list[Transaction]:
    user_transactions = db_session.exec(select(Transaction).where(Transaction.user_id == user.id)).all()
    return user_transactions

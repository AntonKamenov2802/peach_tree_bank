
export enum TransactionType {
  CARD_PAYMENT = 1,
  ONLINE_TRANSFER = 2,
  TRANSACTION = 3
}

export enum TransactionState {
  SEND = 1,
  RECIEVED = 2,
  PAYED = 3
}

export interface CreateTransaction {
  amount: number,
  recipient: string,
  type: TransactionType,
}

export interface Transaction {
  id: string
  date: string,
  amount: number,
  recipient: string,
  type: TransactionType,
  state: TransactionState,
}

export interface UpdateTransactionState {
  state: TransactionState
}

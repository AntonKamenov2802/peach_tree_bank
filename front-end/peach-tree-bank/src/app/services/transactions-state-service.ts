import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction';

export interface TransactionsSharedState {
  transactions: Transaction[],
  current_transaction: Transaction | null
}

@Injectable({ providedIn: 'root' })
export class SharedTransactionsStateService {
  private transactionsSubject = new BehaviorSubject<TransactionsSharedState>({transactions: [], current_transaction: null});
  state = this.transactionsSubject.asObservable();

  updateTransactions(allTransactions: Transaction[]) {
    this.transactionsSubject.next({transactions: allTransactions, current_transaction: null});
  }

  addTransaction(newTransaction: Transaction) {
    const currentTransactionList = this.transactionsSubject.value.transactions;
    currentTransactionList.push(newTransaction);
    this.transactionsSubject.next({transactions: [...currentTransactionList], current_transaction: this.transactionsSubject.value.current_transaction});
  }

  setCurrentTransaction(transaction: Transaction | null) {
    this.transactionsSubject.value.current_transaction = transaction;
    this.transactionsSubject.next(this.transactionsSubject.value);
  }

}

import { Component } from '@angular/core';
import { CreateTransaction, Transaction, TransactionState, TransactionType } from '../../models/transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-overview',
  imports: [],
  templateUrl: './transaction-overview.html',
  styleUrl: './transaction-overview.css'
})
export class TransactionOverview {
  TransactionState = TransactionState;
  TransactionType = TransactionType;


  constructor(private router: Router) {}

  user_transactions: Transaction[] = [
    {
      id: "some_id",
      date: "some_date",
      amount: 123.12312,
      recipient: "some_recipient",
      state: TransactionState.SEND,
      type: TransactionType.ONLINE_TRANSFER
    },
    {
      id: "some_id",
      date: "some_date",
      amount: 123.12312,
      recipient: "some_recipient",
      state: TransactionState.RECIEVED,
      type: TransactionType.CARD_PAYMENT
    },
    {
      id: "some_id",
      date: "some_date",
      amount: 123.12312,
      recipient: "some_recipient",
      state: TransactionState.PAYED,
      type: TransactionType.TRANSACTION
    }
  ];

  onSubmit() {

  }

  onTransactionClicked(index: number) {
    this.router.navigate([`/transactions/${this.user_transactions[index].id}`])
  }
}

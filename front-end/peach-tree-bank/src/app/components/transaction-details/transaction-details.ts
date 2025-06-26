import { Component } from '@angular/core';
import { Transaction, TransactionState, TransactionType } from '../../models/transaction';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-details',
  imports: [FormsModule],
  templateUrl: './transaction-details.html',
  styleUrl: './transaction-details.css'
})
export class TransactionDetails {

  TransactionState = TransactionState;
  TransactionType = TransactionType;

  currentTransactionState: TransactionState = TransactionState.PAYED;

  transaction: Transaction = {
    id: "some_id",
    date: "some_date",
    amount: 123.12312,
    recipient: "some_recipient",
    state: TransactionState.PAYED,
    type: TransactionType.ONLINE_TRANSFER
  };

  ngOnInit() {
    this.currentTransactionState = this.transaction.state;
  }

  updateState() {
    console.log(this.currentTransactionState);
    console.log(this.transaction.state);
  }

}

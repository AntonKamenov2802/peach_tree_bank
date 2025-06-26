import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateTransaction, Transaction, TransactionState, TransactionType } from '../../models/transaction';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';
import { TransactionOverview } from '../transaction-overview/transaction-overview';
import { SharedTransactionsStateService } from '../../services/transactions-state-service';

@Component({
  selector: 'app-transaction-view',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './transaction-view.html',
  styleUrl: './transaction-view.css'
})
export class TransactionView {
  TransactionType = TransactionType;

  private http = inject(HttpClient)

  user_transactions: Transaction[] = [];

  cardHeader: string = '';
  newTransaction: CreateTransaction = {
    amount: 0.0,
    recipient: '',
    type: TransactionType.TRANSACTION
  }

  constructor(private router: Router, private sharedTransactionsStateService: SharedTransactionsStateService) {
  }


  getCardHeader(){
    if (this.router.url === '/transactions') {
      return this.cardHeader = 'Recent Transactions';
    } else {
      let transaction_id = this.router.url.split('/').pop();
      if (transaction_id == undefined) {
        return ''
      }
      return `Details for transaction: ${transaction_id}`
    }
  }

  onSubmit() {
    console.log(this.newTransaction)
    this.http.post<Transaction>("http://localhost:8080/api/v1/transaction", {
      amount: this.newTransaction.amount,
      recipient: this.newTransaction.recipient,
      type: this.newTransaction.type,
      state: TransactionState.SEND
    }).pipe(first()).subscribe({
      next: transaction => {
        this.newTransaction.amount = 0.0;
        this.newTransaction.recipient = '';
        this.newTransaction.type = TransactionType.TRANSACTION;
        this.sharedTransactionsStateService.addTransaction(transaction);
      },
      error: e => {
        if (e.status == 401) {
          this.router.navigate(['/login'])
          console.log("Incorrect username or password")
        }
        else {
          console.log(e); // TODO: Handle other status codes
        }
      }
    })
  }

}

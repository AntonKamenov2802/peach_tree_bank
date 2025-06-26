import { Component, inject } from '@angular/core';
import { CreateTransaction, Transaction, TransactionState, TransactionType } from '../../models/transaction';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';
import { SharedTransactionsStateService } from '../../services/transactions-state-service';

@Component({
  selector: 'app-transaction-overview',
  imports: [],
  templateUrl: './transaction-overview.html',
  styleUrl: './transaction-overview.css'
})
export class TransactionOverview {
  TransactionState = TransactionState;
  TransactionType = TransactionType;

  private http = inject(HttpClient)

  constructor(private router: Router, private sharedTransactionsStateService: SharedTransactionsStateService) {}

  user_transactions: Transaction[] = [];

  ngOnInit() {
    this.http.get<Transaction[]>("http://localhost:8080/api/v1/transactions").pipe(first()).subscribe({
      next: transactions => {
        this.sharedTransactionsStateService.updateTransactions(transactions)
        this.sharedTransactionsStateService.state.subscribe((state) => (this.user_transactions = state.transactions));
      },
      error: e => {
        if (e.status == 401) {
          this.router.navigate(['/login'])
          console.log("Incorrect username or password")
        }
      }
    })
  }

  public onTransactionCreated(transaction: Transaction) {
    this.user_transactions.push(transaction)
  }

  onTransactionClicked(index: number) {
    this.router.navigate([`/transactions/${this.user_transactions[index].id}`])
    this.sharedTransactionsStateService.setCurrentTransaction(this.user_transactions[index])
  }
}

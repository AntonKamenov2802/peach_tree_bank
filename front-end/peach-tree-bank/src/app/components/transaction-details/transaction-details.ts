import { Component, inject } from '@angular/core';
import { Transaction, TransactionState, TransactionType, UpdateTransactionState } from '../../models/transaction';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedTransactionsStateService } from '../../services/transactions-state-service';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-transaction-details',
  imports: [FormsModule],
  templateUrl: './transaction-details.html',
  styleUrl: './transaction-details.css'
})
export class TransactionDetails {

  TransactionState = TransactionState;
  TransactionType = TransactionType;

  private http = inject(HttpClient)
  currentTransactionState: TransactionState = TransactionState.PAYED;


  constructor(private router: Router, private sharedTransactionsStateService: SharedTransactionsStateService) {}

  transaction: Transaction = {
    id: '',
    date: '',
    amount: 0,
    recipient: '',
    type: TransactionType.CARD_PAYMENT,
    state: TransactionState.SEND
  }

  ngOnInit() {
    this.sharedTransactionsStateService.state.subscribe((state) => {
      if (state.current_transaction != null) {
        this.transaction = state.current_transaction
      }
    });
    this.currentTransactionState = this.transaction.state;
  }

  updateState() {
    this.http.patch<UpdateTransactionState>(`http://localhost:8080/api/v1/transaction/${this.transaction.id}`, {
      state: this.currentTransactionState
    }).pipe(first()).subscribe({
      next: state => {
        this.transaction.state = state.state;
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
};

}

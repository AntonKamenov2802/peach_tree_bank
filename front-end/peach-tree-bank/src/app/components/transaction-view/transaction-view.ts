import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateTransaction, Transaction, TransactionState, TransactionType } from '../../models/transaction';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-transaction-view',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './transaction-view.html',
  styleUrl: './transaction-view.css'
})
export class TransactionView {
  cardHeader: string = '';

  TransactionType = TransactionType;
  newTransaction: CreateTransaction = {
    amount: 0.0,
    recipient: '',
    type: TransactionType.TRANSACTION
  }

  constructor(private router: Router) {
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

  }

}

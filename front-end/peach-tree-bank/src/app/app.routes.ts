import { Routes } from '@angular/router';
import { LogInView } from './components/log-in-view/log-in-view';
import { TransactionView } from './components/transaction-view/transaction-view';

export const routes: Routes = [
  {
    path: 'login',
    component: LogInView
  },
  {
    path: 'transactions',
    component: TransactionView
  }
];

import { Routes } from '@angular/router';
import { LogInView } from './components/log-in-view/log-in-view';
import { TransactionView } from './components/transaction-view/transaction-view';
import { TransactionOverview } from './components/transaction-overview/transaction-overview';
import { TransactionDetails } from './components/transaction-details/transaction-details';

export const routes: Routes = [
  {
    path: 'login',
    component: LogInView
  },
  {
    path: 'transactions',
    component: TransactionView,
    children: [
      {
        path: '',
        component: TransactionOverview
      },
      {
        path: ':id',
        component: TransactionDetails
      }
    ]
  }
];

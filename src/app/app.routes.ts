import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomerComponent } from './components/customer/customer.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { MerchantComponent } from './components/merchant/merchant.component';
import { AddMerchantComponent } from './components/merchant/add-merchant/add-merchant.component';
import { ViewMerchantComponent } from './components/merchant/view-merchant/view-merchant.component';
import { UpdateMerchantComponent } from './components/merchant/update-merchant/update-merchant.component';
import { CardComponent } from './components/card/card.component';
import { CardRequestComponent } from './components/card/card-request/card-request.component';
import { ViewRequestsComponent } from './components/card/view-requests/view-requests.component';
import { ViewCardsComponent } from './components/card/view-cards/view-cards.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransferAmountComponent } from './components/transaction/transfer-amount/transfer-amount.component';
import { ViewTransactionsComponent } from './components/transaction/view-transactions/view-transactions.component';
import { BillComponent } from './components/bill/bill.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { isCustomerGuard } from './guards/is-customer.guard';
import { isAdminGuard } from './guards/is-admin.guard';
export const routes: Routes = [
  { path: 'register', component: AddCustomerComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'update-customer',
    component: UpdateCustomerComponent,
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'merchant',
    component: MerchantComponent,
    canActivate: [isLoggedInGuard, isAdminGuard],
    canActivateChild: [isLoggedInGuard, isAdminGuard],
    children: [
      { path: 'add-merchant', component: AddMerchantComponent },
      { path: 'update', component: UpdateMerchantComponent },
      { path: 'view', component: ViewMerchantComponent },
      { path: '', redirectTo: 'view', pathMatch: 'full' },
    ],
  },
  {
    path: 'card',
    component: CardComponent,
    canActivate: [isLoggedInGuard],
    canActivateChild: [isLoggedInGuard],
    children: [
      {
        path: 'request',
        component: CardRequestComponent,
        canActivate: [isCustomerGuard],
      },
      {
        path: 'view-requests',
        component: ViewRequestsComponent,
        canActivate: [isAdminGuard],
      },
      { path: 'view-cards', component: ViewCardsComponent },
      { path: '', redirectTo: 'view-cards', pathMatch: 'full' },
    ],
  },
  {
    path: 'transaction',
    component: TransactionComponent,
    children: [
      {
        path: 'transfer-amount',
        component: TransferAmountComponent,
        canActivate: [isCustomerGuard],
      },
      { path: 'view-all', component: ViewTransactionsComponent },
      { path: '', redirectTo: 'view-all', pathMatch: 'full' },
    ],
    canActivate: [isLoggedInGuard],
    canActivateChild: [isLoggedInGuard],
  },
  {
    path: 'bill',
    component: BillComponent,
    canActivate: [isCustomerGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

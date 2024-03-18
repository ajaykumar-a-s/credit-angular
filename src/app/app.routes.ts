import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomerComponent } from './components/customer/customer.component';
import { UpdateCustomerComponent } from './components/customer/update-customer/update-customer.component';
import { ViewCustomerComponent } from './components/customer/view-customer/view-customer.component';
import { ViewCustomersComponent } from './components/customer/view-customers/view-customers.component';
import { DeleteCustomerComponent } from './components/customer/delete-customer/delete-customer.component';
import { MerchantComponent } from './components/merchant/merchant.component';
import { AddMerchantComponent } from './components/merchant/add-merchant/add-merchant.component';
import { ViewMerchantComponent } from './components/merchant/view-merchant/view-merchant.component';
import { ViewMerchantsComponent } from './components/merchant/view-merchants/view-merchants.component';
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
export const routes: Routes = [
  { path: 'register', component: AddCustomerComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'customer',
    component: CustomerComponent,
    children: [
      { path: 'update', component: UpdateCustomerComponent },
      { path: 'view', component: ViewCustomerComponent },
      { path: 'view-all', component: ViewCustomersComponent },
      { path: 'delete', component: DeleteCustomerComponent },
    ],
  },
  {
    path: 'merchant',
    component: MerchantComponent,
    children: [
      { path: 'add', component: AddMerchantComponent },
      { path: 'update', component: UpdateMerchantComponent },
      { path: 'view', component: ViewMerchantComponent },
      { path: 'view-all', component: ViewMerchantsComponent },
      { path: 'delete', component: DeleteCustomerComponent },
    ],
  },
  {
    path: 'card',
    component: CardComponent,
    children: [
      { path: 'request', component: CardRequestComponent },
      { path: 'view-requests', component: ViewRequestsComponent },
      { path: 'view-cards', component: ViewCardsComponent },
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
    ],
    canActivate: [isLoggedInGuard],
    canActivateChild: [isLoggedInGuard],
  },
  {
    path: 'bill',
    component: BillComponent,
    
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

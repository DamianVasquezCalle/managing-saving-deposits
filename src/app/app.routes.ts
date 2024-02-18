import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { DepositsComponent } from './components/deposits/deposits.component';

export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'deposits', component: DepositsComponent },
];

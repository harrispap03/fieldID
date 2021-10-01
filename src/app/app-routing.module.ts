import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { RecordComponent } from './record/record.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'qrScanner', component: QrScannerComponent },
  { path: 'manageUsers', component: ManageUsersComponent },
  { path: 'record', component: RecordComponent },
  { path: '**', component: HomeComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { RecordComponent } from './record/record.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'HomePage' },
  },
  {
    path: 'qrScanner',
    component: QrScannerComponent,
    data: { animation: 'ScannerPage' },
  },
  {
    path: 'manageUsers',
    component: ManageUsersComponent,
    data: { animation: 'ManageUsersPage' },
  },
  {
    path: 'record',
    component: RecordComponent,
    data: { animation: 'RecordPage' },
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

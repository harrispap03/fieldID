import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { RecordComponent } from './record/record.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  {
    path: 'manageUsers',
    component: ManageUsersComponent,
    data: { animation: 'isLeft' },
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'qrScanner',
    component: QrScannerComponent,
    // data: { animation: 'fader' },
  },
  {
    path: 'record',
    component: RecordComponent,
    data: { animation: 'isRight' },
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

import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, mergeMap } from 'rxjs/operators';
import { RecentUser } from '../models/recentUser.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent {
  private qrResult$ = new Subject<string>();
  addUserToAFS!: Subscription;
  userData!: User;
  private recentUserData!: RecentUser;

  constructor(private afs: AngularFirestore) {
    this.addUserToAFS = this.qrResult$
      .pipe(
        distinctUntilChanged(),
        mergeMap((qrResult) =>
          this.afs.collection<User>('users').doc(qrResult).valueChanges()
        )
      )
      .subscribe((userData: any) => {
        this.userData = userData;
        this.recentUserData = this.userData;
        this.recentUserData.checkInTime = new Date();
        this.afs.collection('recentUsers').add(this.recentUserData);
      });
  }

  onCamerasNotFound(error: Error) {
    console.log(error); // Replace this with some HTML
  }

  onScanSuccess(qrCode: string) {
    this.qrResult$.next(qrCode);
  }

  // this.sub = this.qrResult$.pipe(
  //   filter(id => !!id),
  //   distinctUntilChanged(),
  //   mergeMap((IncomingQRResult ) => this.afs.collection('users').doc(IncomingQRResult).valueChanges())
  // ).subscribe( data => {
  //   this.doc = data;
  //   this.doc.checkInTime = new Date();
  //   this.afs.collection('recentUsers').add(this.doc);
  // });
}

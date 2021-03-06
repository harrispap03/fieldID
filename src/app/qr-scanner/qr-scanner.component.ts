import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { filter, distinctUntilChanged, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent {
  private qrResult$ = new BehaviorSubject(null);
  private sub;
  public userInfo;
  private doc;
  error: string;
  userId: string;
  constructor(private afs: AngularFirestore) {
    this.sub = this.qrResult$.pipe(
      filter(id => !!id),
      distinctUntilChanged(),
      mergeMap((IncomingQRResult ) => this.afs.collection('users').doc(IncomingQRResult).valueChanges())
    ).subscribe( data => {
      this.doc = data;
      this.doc.checkInTime = new Date();
      this.afs.collection('recentUsers').add(this.doc);
    });
  }

  onScanSuccess(qrResult: string){
    this.qrResult$.next(qrResult);
  }

  Error(e: Event) {
    this.error = 'Cameras not found';
  }
}



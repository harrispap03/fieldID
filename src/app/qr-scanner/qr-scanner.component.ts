import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { browser } from 'protractor';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscriber,
  Subscription,
} from 'rxjs';
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
  private recentUserData!: RecentUser | undefined;
  camerasNotFound!: boolean;
  success = 'Success';
  constructor(private afs: AngularFirestore) {
    this.addUserToAFS = this.qrResult$
      .pipe(
        distinctUntilChanged(),
        mergeMap((qrResult) =>
          this.afs.collection<User>('users').doc(qrResult).valueChanges()
        )
      )
      .subscribe((userData: User | undefined) => {
        this.recentUserData = userData;
        this.recentUserData!.checkInTime = new Date();
        this.afs.collection('recentUsers').add(this.recentUserData);
        this.playScannSuccessAudio();
      });
  }

  playScannSuccessAudio() {
    let audio = new Audio();
    audio.src = '../../assets/scannedAudio.wav';
    audio.load();
    audio.play();
  }

  onCamerasNotFound(error: Error) {
    window.alert('The scanner needs a camera to work.  No camera found :(');
  }

  onScanSuccess(qrCode: string) {
    this.qrResult$.next(qrCode);
  }
}

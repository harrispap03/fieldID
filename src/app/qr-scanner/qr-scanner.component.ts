import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { listAnimation } from '../animations';
import { RecentUser } from '../models/recentUser.model';
import { User } from '../models/user.model';
@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
  animations: [listAnimation],
})
export class QrScannerComponent {
  cameraError = 'Could not detect camera, please allow the use of it in settings';
  private qrResult$ = new Subject<string>();
  addUserToAFS!: Subscription;
  userData!: User;
  private recentUserData!: RecentUser | undefined;
  camerasNotFound!: boolean;
  success = false;
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
        this.playScanSuccesAudio();
        this.success = true;
        setTimeout(() => (this.success = false), 2000);
      });
  }

  playScanSuccesAudio() {
    let audio = new Audio();
    audio.src = '../../assets/scannedAudio.wav';
    audio.load();
    audio.play();
  }

  onCamerasFound() {
    this.cameraError = "";
  }

  onScanSuccess(qrCode: string) {
    this.qrResult$.next(qrCode);
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RecentUser } from '../models/recentUser.model';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements OnInit {
  recentUsers$!: Observable<RecentUser[]>;
  displayedColumns: string[] = ['name', 'surname', 'idNum', 'checkInTime'];

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.recentUsers$ = this.afs
      .collection<RecentUser>('recentUsers', (ref) =>
        ref.orderBy('checkInTime', 'desc')
      )
      .valueChanges();
  }
}

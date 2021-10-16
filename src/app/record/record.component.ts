import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecentUser } from '../models/recentUser.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { listAnimation } from '../animations';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
  animations: [listAnimation],
})
export class RecordComponent implements OnInit {
  recentUsers$!: any;
  dataSource = new MatTableDataSource<RecentUser>();
  displayedColumns: string[] = ['name', 'surname', 'idNum', 'checkInTime'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private afs: AngularFirestore) {}

  trackBy(user: any) {
    return user.id;
  }

  ngOnInit() {
    this.recentUsers$ = this.afs
      .collection<RecentUser>('recentUsers', (ref) =>
        ref.orderBy('checkInTime', 'desc')
      )
      .valueChanges()
      .subscribe((things) => {
        this.dataSource = new MatTableDataSource(things);
        this.dataSource.paginator = this.paginator;
      });
  }
}

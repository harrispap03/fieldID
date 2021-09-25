import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecentUser } from '../models/recentUser.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements OnInit, AfterViewInit {
  recentUsers$!: Observable<RecentUser[]>;
  displayedColumns: string[] = ['name', 'surname', 'idNum', 'checkInTime'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private afs: AngularFirestore) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.recentUsers$ = this.afs
      .collection<RecentUser>('recentUsers', (ref) =>
        ref.orderBy('checkInTime', 'desc')
      ).
      valueChanges().pipe(
        map(recentUsers => recentUsers.slice(start, end))
      )
}

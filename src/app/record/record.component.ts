import { Component, ViewChild } from '@angular/core';
import { RecentUser } from '../models/recentUser.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { listAnimation } from '../animations';
import { Subscription } from 'rxjs';
import { UsersService } from '../manage-users/users.service';
import { User } from '../models/user.model';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
  animations: [listAnimation],
})
export class RecordComponent {
  recentUsers$!: Subscription;
  dataSource = new MatTableDataSource<RecentUser>();
  displayedColumns: string[] = [
    'name',
    'surname',
    'idNum',
    'checkInTime',
    'delete',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _usersService: UsersService) {
    this.recentUsers$ = this._usersService
      .getRecentUsers()
      .subscribe((things) => {
        this.dataSource = new MatTableDataSource(things);
        this.dataSource.paginator = this.paginator;
      });
  }

  trackBy(user: any) {
    return user.id;
  }

  deleteUser(user: User) {
    this._usersService.deleteRecentUser(user);
  }
}

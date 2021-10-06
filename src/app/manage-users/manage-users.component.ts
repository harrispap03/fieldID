import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { User } from '../models/user.model';
import { UsersService } from './users.service';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent {
  users$!: Observable<User[]>;
  displayedColumns: string[] = ['name', 'surname', 'idNum', 'edit', 'delete'];

  constructor(
    public newUserPopup: MatDialog,
    private _usersService: UsersService
  ) {
    this.users$ = this._usersService.getUsers();
  }

  popup() {
    this.newUserPopup.open(AddNewUserComponent);
  }

  onSearch(searchInputValue: string) {
    this._usersService
      .getUserBySearchInput(searchInputValue)
      .valueChanges()
      .subscribe((result: any) => (this.users$ = result));
  }

  deleteUser(user: User) {
    this._usersService.deleteUser(user);
  }
}

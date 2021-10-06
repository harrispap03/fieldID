import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { UsersService } from './users.service';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  users$!: any; // find the type of this thing
  displayedColumns: string[] = ['name', 'surname', 'idNum', 'edit'];

  constructor(
    public newUserPopup: MatDialog,
    private _usersService: UsersService
  ) {
    this.users$ = this._usersService.getUsers().valueChanges();
  }

  popup() {
    this.newUserPopup.open(AddNewUserComponent);
  }

  onSearch(searchInputValue: string) {
    this._usersService
      .getUserBySearchInput(searchInputValue)
      .valueChanges()
      .subscribe((result) => (this.users$ = result));
  }
  ngOnInit() {}
}

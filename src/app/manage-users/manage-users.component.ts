import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { User } from '../models/user.model';
import { UsersService } from './users.service';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent {
  users$!: Observable<User[]>;
  displayedColumns: string[] = ['name', 'surname', 'idNum', 'edit',];

  constructor(public popup: MatDialog, private _usersService: UsersService) {
    this.users$ = this._usersService.getUsers();
  }

  addNewUser() {
    this.popup.open(AddNewUserComponent);
  }

  editUser(user: User) {
    this.popup.open(EditUserComponent, {
      data: {
        name: user.name,
        surname: user.surname,
        idNum: user.idNum,
        id: user.id,
      },
    });
  }

  onRefresh(){
    this.users$ = this._usersService.getUsers();
  }

  onSearch(searchInputValue: string) {
    this.users$ = this._usersService.getUserBySearchInput(searchInputValue);
  }

  deleteUser(user: User) {
    this._usersService.deleteUser(user);
  }
}

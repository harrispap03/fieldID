import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  constructor(public newUserPopup: MatDialog) { }

  popup(){
    this.newUserPopup.open(AddNewUserComponent,{
      height: '600px',
      width: '800px'
    })
  }

  ngOnInit(): void {
  }

}

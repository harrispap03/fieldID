import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../models/user.model';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  newUserForm!: FormGroup;
  qrCodeCreated = false;
  userDoc!: any; //
  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public userData: User
  ) {
  }

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      name: [this.userData.name || '', [Validators.required]],
      surname: [this.userData.surname || '', [Validators.required]],
      idNum: [this.userData.idNum || 0, [Validators.required]],
      search: [null],
    });
  }

  getSearchArray(formValues: any) {
    let searchArray: any = [];
    Object.keys(formValues).map((key) => {
      searchArray.push(formValues[key]);
    });
    return searchArray;
  }

  async onSubmit() {
    try {
      const formValues = await this.newUserForm.getRawValue();
      const searchArray = this.getSearchArray(formValues);
      await this.afs.collection('users').doc(this.userData.id).update({
        name: formValues.name,
        surname: formValues.surname,
        idNum: formValues.idNum,
        search: searchArray,
      });
      this.qrCodeCreated = true;
    } catch (error) {
      console.log(error);
    }
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../models/user.model';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  newUserForm!: FormGroup;
  userId!: string;
  qrCodeCreated = false;
  userDoc!: any;
  myNewThing!: any;
  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public userData: User
  ) {}

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      name: [this.userData.name || '', [Validators.required]],
      surname: [this.userData.surname || '', [Validators.required]],
      idNum: [this.userData.idNum || 0, [Validators.required]],
      search: [null],
    });
    // this.userDoc = this.afs.collection(`users/${this.userData.id}`)
  }

  async readyBatch() {
    // The value of the form the user has submited
    const formValue = await this.newUserForm.value;

    //Taking all the values and putting them into an array
    let searchArray: any = [];
    Object.keys(formValue).map((key) => {
      searchArray.push(formValue[key]);
    });

    //Adding the array to the form
    this.newUserForm.patchValue({ search: searchArray });
  }

  async onSubmit() {
    // await this.readyBatch();

    // Sending the form to the db
    let values = await this.newUserForm.getRawValue();
    console.log(values);

    await this.afs
      .collection('users')
      .doc(this.userData.id)
      .update({
        name: values.name,
        surname: values.surname,
        idNum: values.idNum,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    this.qrCodeCreated = true; // Switches a template variable the other way around so a div will be displayed
    // Will put other stuff like the one above in the future
    // (mainly animations etc to let the user know that the db document has been updated)
  }
}

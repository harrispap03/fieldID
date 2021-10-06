import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss'],
})
export class AddNewUserComponent implements OnInit {
  newUserForm!: FormGroup;
  userId!: string;
  qrCodeCreated = false;

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      idNum: [null, [Validators.required]],
      search: [null],
    });
  }

  async onSubmit() {
    const userData = this.newUserForm.value;

    let arr: any = [];

    Object.keys(userData).map((key) => {
      arr.push(userData[key]);
    });

    this.newUserForm.patchValue({ search: arr });

    const formValue = this.newUserForm.value;
    try {
      await this.afs
        .collection('users')
        .add(formValue)
        .then((user) => (this.userId = user.id));
    } catch (err) {
      console.error(err);
    }
    this.qrCodeCreated = true;
    this.newUserForm.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    });
  }

  async onSubmit() {
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
  }
}

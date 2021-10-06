import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { concat, merge, pipe } from 'rxjs';
import { filter, first, map, switchMap, take } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  results: any;
  docc: any;
  nameQueryResult: any;
  surnameQueryResult!: any;
  idNumQueryResult!: any;

  private usersCollectionReference: AngularFirestoreCollection<User> =
    this.afs.collection<User>('users');

  constructor(private afs: AngularFirestore) {}

  getUserBySearchInput(searchInput: string) {
    return this.afs.collection('users', (ref) =>
      ref.where('search', 'array-contains', searchInput)
    );
  }

  getUsers() {
    return this.usersCollectionReference;
  }
}

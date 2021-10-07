import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userDoc!: AngularFirestoreDocument<User>;
  users$!: Observable<User[]>;
  usersCollection: AngularFirestoreCollection<User>;

  searchResult$!: Observable<User[]>

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users');

    this.users$ = this.usersCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as User;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getUserBySearchInput(searchInput: string): Observable<User[]> {
    this.searchResult$ = this.afs
      .collection('users', (ref) =>
        ref.where('search', 'array-contains', searchInput)
      )
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((a) => {
            const data = a.payload.doc.data() as User;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      )
      return this.searchResult$;
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  deleteUser(user: User): void {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.delete();
  }
}

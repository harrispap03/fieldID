import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecentUser } from '../models/recentUser.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userDoc!: AngularFirestoreDocument<User>;
  users$!: Observable<User[]>;
  usersCollection: AngularFirestoreCollection<User>;
  recentUsers$!: Observable<RecentUser[]>;
  recentUsersCollection!: AngularFirestoreCollection<RecentUser>;

  searchResult$!: Observable<User[]>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users', (ref) =>
      ref.orderBy('dateCreated', 'asc')
    );

    this.recentUsersCollection = this.afs.collection('recentUsers', (ref) =>
      ref.orderBy('checkInTime', 'desc')
    );

    this.users$ = this.usersCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as User;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    this.recentUsers$ = this.recentUsersCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as RecentUser;
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
      );
    return this.searchResult$;
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getRecentUsers(): Observable<RecentUser[]>{
    return this.recentUsers$;
  }

  deleteUser(user: User): void {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.delete();
  }

  deleteRecentUser(user: User): void {
    this.userDoc = this.afs.doc(`recentUsers/${user.id}`);
    this.userDoc.delete();
  }
}

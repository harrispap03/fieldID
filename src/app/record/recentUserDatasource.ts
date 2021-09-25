import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription	} from 'rxjs';
import { RecentUser } from '../models/recentUser.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { promise } from 'selenium-webdriver';

export class RecentuserDataSource extends MatTableDataSource<RecentUser>{
	private incomingUsers!: any;

	private incomingUsersSub!: Observable<RecentUser>;

	constructor(private afs: AngularFirestore){
		super();
		this.incomingUsers = this.afs
      .collection<RecentUser>('recentUsers').get()
      
	}

}

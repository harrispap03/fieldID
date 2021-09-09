import { User } from "./user.model";

export interface RecentUser extends User{
	checkInTime: string;
}
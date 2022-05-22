import { User } from "./user";

export interface Meeting {
    _id: string;
    duration: string;
    startDate: Date;
    endDate: Date;
    users: Array<User>;
    type: string;
}
import { User } from "./user";

export interface Team {
    _id  : string;
    name : string;
    users: Array<User>;
}
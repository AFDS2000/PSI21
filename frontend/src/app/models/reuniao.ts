export interface Reuniao {
    _id: string;
    duration: Number;
    startDate: Date;
    endDate: Date | null;
    users: Array<string>;
    type: string;
    hourStart: string;
}
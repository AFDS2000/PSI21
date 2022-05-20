export interface Task {
    _id: string;
    name: string;
    level: string;
    percentageConclusion: number;
    users: Array<string>;
    tsStart: number;
    tsEnd: number;

}

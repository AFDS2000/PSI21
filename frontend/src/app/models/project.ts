export interface Project {
    _id: string;
    name: string;
    alias: string;
    startDate: Date;
    endDate: Date | null;
    tasks: Array<string> | null;
    teams: Array<string> | null;
}
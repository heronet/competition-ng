import { Student } from "./student";


    export interface Competition {
        id: string;
        name: string;
        dateTime: Date;
        createdAt: Date;
        attendees: Student[];
    }
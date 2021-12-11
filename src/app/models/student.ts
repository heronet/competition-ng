 export interface Student {
        id: string;
        name: string;
        class: string;
        section: string;
        house: string;
        email: string;
        ncpscId: string;
        phone: string;
        schoolName: string;
        score?: number; // Used for tsc
        subname?: string; // for participant
        competitions: string[];
    }
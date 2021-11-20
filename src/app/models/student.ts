 export interface Student {
        id: string;
        name: string;
        class: string;
        section: string;
        house: string;
        email: string;
        ncpscId: string;
        phone: string;
        score?: number; // Used for tsc
        competitions: string[];
    }
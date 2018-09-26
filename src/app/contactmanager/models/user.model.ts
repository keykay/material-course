import { Note } from './note.model';

export interface User {
    id: number;
    dateOfBirth?: Date;
    name: string;
    avatar?: string;
    bio?: string;

    notes?: Note[];
}

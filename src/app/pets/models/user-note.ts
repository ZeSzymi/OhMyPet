export interface UserNote {
    type: string;
    id: string;
    attributes: Attributes;
}

export interface Attributes {
    date: string;
    duration: string;
    name: string;
    petId: string;
    userId?: string;
}
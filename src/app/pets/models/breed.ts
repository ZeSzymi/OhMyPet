export class Breed {
    name: string;
    attributes: Attributes;
    selected: boolean;
}

export class Attributes {
    id: string;
    name: string;
    speciesId: string;
}
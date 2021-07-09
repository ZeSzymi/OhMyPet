import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Breed } from "../models/breed";
import { Specie } from "../models/species";
import { map } from 'rxjs/operators';
import { HttpModel } from "src/app/models/http";
import { Pet } from "../models/pet";
import { petImage } from "../models/pet-image";
import { Observable, Subject } from "rxjs";
import { UserNote } from "../models/user-note";

@Injectable({ providedIn: 'any' })
export class PetsDataService {
    constructor(private http: HttpClient) { }

    addUserNoteSubject = new Subject<void>();

    getPets(): Observable<Pet[]> {
        return this.http.get<HttpModel<Pet[]>>(`${environment.backendUrl}/api/pets`)
        .pipe(
            map(model => { 
            return model.data.map(pet => {
                const img = petImage.find(petImg => petImg.id === pet.attributes.breedId)?.img ?? "dog.png";
                return {...pet, img }
            })
        }));
    }

    getPet(petId: string): Observable<Pet> {
        return this.http.get<HttpModel<Pet>>(`${environment.backendUrl}/api/pets/${petId}`)
        .pipe(
            map(model => { 
                const pet = model.data;
                const img = petImage.find(petImg => petImg.id === pet.attributes.breedId)?.img ?? "dog.png";
                return {...pet, img }
            })
        );
    }

    getBreeds() {
        return this.http.get<HttpModel<Breed[]>>(`${environment.backendUrl}/api/breeds`).pipe(map(model => model.data));
    }

    getSpecies() {
        return this.http.get<HttpModel<Specie[]>>(`${environment.backendUrl}/api/species`).pipe(map(model => model.data));
    }

    getUserNotes() {
        return this.http.get<HttpModel<UserNote[]>>(`${environment.backendUrl}/api/user_notes`).pipe(map(model => model.data));
    }

    addUserNote(userId: string, name: string, petId: string, duration: number, date: string) {
        const userNote = {
            user_id: userId,
            pet_id: petId,
            name,
            duration,
            date
        }
        return this.http.post<HttpModel<UserNote[]>>(`${environment.backendUrl}/api/user_notes`, userNote)
    }

    deleteUserNote(userNoteId: string) {
        return this.http.delete(`${environment.backendUrl}/api/user_notes/${userNoteId}`)
    }

    deletePet(petId: string) {
        return this.http.delete(`${environment.backendUrl}/api/pets/${petId}`)
    }

    addPet(userId: string, breedId: string, dateOfBirth: string, name: string) {
        const petModel = {
            name,
            user_id: userId,
            breed_id: breedId,
            date_of_birth: dateOfBirth
        }

        return this.http.post(`${environment.backendUrl}/api/pets`, petModel);
    }

    editPet(userId: string, breedId: string, dateOfBirth: string, name: string, petId: string) {
        const petModel = {
            name,
            user_id: userId,
            breed_id: breedId,
            date_of_birth: dateOfBirth
        }

        return this.http.put(`${environment.backendUrl}/api/pets/${petId}`, petModel);
    }
}
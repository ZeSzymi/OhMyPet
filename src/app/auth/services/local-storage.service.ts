import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'any' })
export class LocalStorageService {
    constructor(private http: HttpClient) { }

    write(name: string, value: any) {
        window.localStorage.setItem(name, JSON.stringify(value));
    }

    read(name: string) {
        const data = window.localStorage.getItem(name);
        if (data != null) {
            return JSON.parse(data);
        }
        
        return null;
    }

    remove(name: string) {
        window.localStorage.removeItem(name);
    }
}
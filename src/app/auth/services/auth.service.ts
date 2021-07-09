import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../models/user-model";
import { LocalStorageService } from "./local-storage.service";

@Injectable({ providedIn: 'any' })
export class AuthService {
    constructor(private localStorage: LocalStorageService) { }

    get isAuthorized() {
        return !this.checkIfTokenExpired();
    }

    authorizationChangedSubject: Subject<void> = new Subject();

    loginUser(email: string, token: string, expiry: number, userId: string, client: string) {
        const user = {
            email,
            token,
            expiry,
            userId,
            client
        } as User;
        this.localStorage.write("user_data", user);
        this.authorizationChangedSubject.next();
    }

    logOutUser() {
        this.localStorage.remove("user_data");
        this.authorizationChangedSubject.next();
    }

    getUser(): User {
        return this.localStorage.read("user_data");
    }

    checkIfTokenExpired() {
        var user = this.getUser();

        if (user == null) {
            return true
        }

        if (Date.now() >= user.expiry * 1000) {
            return true;
        }

        return false;
    }

}
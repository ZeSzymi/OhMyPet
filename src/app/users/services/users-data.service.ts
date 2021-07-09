import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'any' })
export class UsersService {
    constructor(private http: HttpClient) { }

    signUpUser(email: string, password: string) {
        return this.http.post(`${environment.backendUrl}/auth`, { email, password, confirm_success_url: `${environment.localUrl}/confirm` })
    }

    loginUser(email: string, password: string) {
        return this.http.post(`${environment.backendUrl}/auth/sign_in`, { email, password }, { observe: 'response'})
    }
}
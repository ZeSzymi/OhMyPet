import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Breed } from "../models/breed";
import { PetsDataService } from "../services/pets-data.service";

@Injectable()
export class BreedsResolver implements Resolve<Breed[]> {
  constructor(private petsService: PetsDataService) {}
 
  resolve(route: ActivatedRouteSnapshot) {
    return this.petsService.getBreeds();
  }
}
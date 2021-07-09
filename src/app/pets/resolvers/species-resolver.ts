import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Specie } from "../models/species";
import { PetsDataService } from "../services/pets-data.service";

@Injectable()
export class SpeciesResolver implements Resolve<Specie[]> {
  constructor(private petsService: PetsDataService) {}
 
  resolve(route: ActivatedRouteSnapshot) {
    return this.petsService.getSpecies();
  }
}
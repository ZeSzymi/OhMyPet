import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breed } from '../../models/breed';
import { Pet } from '../../models/pet';
import { Specie } from '../../models/species';
import { PetsDataService } from '../../services/pets-data.service';

@Component({
  selector: 'app-pets-dashboard',
  templateUrl: './pets-dashboard.component.html',
  styleUrls: ['./pets-dashboard.component.scss']
})
export class PetsDashboardComponent implements OnInit {

  pets: Pet[] = [];
  breeds: Breed[] = []
  species: Specie[] = []
  filteredPets: Pet[] = [];

  constructor(private petsService: PetsDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.petsService.getPets().subscribe((response: any) => this.pets = response);
    this.route.parent?.data.subscribe((data) => {
      this.breeds = data.breeds;
      this.species =  data.species;
      console.log(this.breeds, this.species);
    });
    
    
  }

  onFiltersChange() {
    const filteredBreeds =  this.breeds.filter(breed => breed.selected);
    this.filteredPets = this.pets.filter(pet => 
      filteredBreeds.map(breed => breed.attributes.id).includes(pet.attributes.breedId))
  }

  navigateToPetForm() {
    this.router.navigate(['app/create']);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Breed } from '../../models/breed';
import { Specie } from '../../models/species';

@Component({
  selector: 'app-pet-filters',
  templateUrl: './pet-filters.component.html',
  styleUrls: ['./pet-filters.component.scss']
})
export class PetFiltersComponent implements OnInit {

  @Input() breeds: Breed[] = []
  @Input() species: Specie[] = []

  @Input() filteredBreeds: Breed[] = []
  @Output() onFiltersChanged = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    this.species = this.species.map((specie, index) => {
      index == 0 ? specie.selected = true : specie.selected = false
      return specie;
    })
    this.filterBreeds();
  }

  filterBreeds() {
    const selectedSpecies = this.species.filter(specie => specie.selected === true);
    this.filteredBreeds = this.breeds.filter(breed => selectedSpecies.filter(specie => specie.selected).map(specie => specie.id).includes(breed.attributes.speciesId))
    
    this.breeds.forEach(breed => breed.selected = false)
    const firstBreed = this.filteredBreeds.find((breed, index) => index === 0) as Breed;
    if (firstBreed != null) {
      firstBreed.selected = true;
    }
  }

  selectBreed(breed: Breed) {
    breed.selected = !breed.selected;
    this.onFiltersChanged.emit()
  }

  selectSpecie(specie: Specie) {
    specie.selected = !specie.selected;
    this.filterBreeds();
    this.onFiltersChanged.emit()
  }

}

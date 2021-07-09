
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Breed } from '../../models/breed';
import { Pet } from '../../models/pet';
import { petImage } from '../../models/pet-image';
import { Specie } from '../../models/species';
import { PetsDataService } from '../../services/pets-data.service';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent implements OnInit {

  petForm: FormGroup;
  breeds: Breed[];
  species: Specie[];
  filteredBreeds: Breed[] = [];
  petImage: string;
  editMode: boolean = false;
  petId: string = ''

  constructor(private route: ActivatedRoute, private petsService: PetsDataService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.petId = this.route.snapshot.queryParams.petId;

    this.route.parent?.data.subscribe((data) => {
      this.breeds = data.breeds;
      this.species =  data.species;
    });

    const firstSpecie = this.species[0];
    this.filteredBreeds = this.breeds.filter(breed => breed.attributes.speciesId === firstSpecie.attributes.id);

    this.petForm = new FormGroup({
      name: new FormControl("Rex"),
      dateOfBirth: new FormControl(new Date()),
      specie: new FormControl(firstSpecie),
      breed: new FormControl(this.filteredBreeds[0])
    })

    if (this.petId != null) {
      this.petsService.getPet(this.petId).subscribe(pet => this.editFlow(pet))
    }

    this.changeImage(firstSpecie.attributes.id);

  }

  editFlow(pet: Pet) {
    const selctedBreed = this.breeds.find(breed => breed.attributes.id == pet.attributes.breedId);
    const selectedSpecie = this.species.find(specie => specie.attributes.id == pet.attributes.speciesId);
    this.filteredBreeds = this.breeds.filter(breed => breed.attributes.speciesId === selectedSpecie?.attributes.id);
    this.petForm.patchValue({
      name: pet.attributes.name,
      dateOfBirth: new Date(pet.attributes.dateOfBirth),
      selctedBreed,
      selectedSpecie
    })
    this.changeImage(selectedSpecie?.attributes.id);
    this.editMode = true;
  }

  changeBreeds() {
    const specie = this.petForm.value.specie;
    this.filteredBreeds = this.breeds.filter(breed => breed.attributes.speciesId === specie.attributes.id);
    this.petForm.patchValue({
      breed : this.filteredBreeds[0]
    })
    this.changeImage(specie?.attributes.id);
  }

  changeImage(specieId?: string)  {
    const img = petImage.find(petImage => petImage.id === specieId);
    this.petImage = img?.img || 'dog.png';
  }

  addPet() {
    const breedId = this.petForm.value.breed.attributes.id;
    const name = this.petForm.value.name;
    const dateOfBirth = new Date(this.petForm.value.dateOfBirth.getTime() - (this.petForm.value.dateOfBirth.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
                        
    const user = this.authService.getUser();
    if (this.editMode) {
      this.petsService.editPet(user.userId, breedId, dateOfBirth, name, this.petId).subscribe(() => this.router.navigate(['app/dashboard']));
    } else {
      this.petsService.addPet(user.userId, breedId, dateOfBirth, name).subscribe(() => this.router.navigate(['app/dashboard']));
    }
   
  }

  deletePet() {
    this.petsService.deletePet(this.petId).subscribe(() => this.router.navigate(['/app/dashboard']))
  }
  
}

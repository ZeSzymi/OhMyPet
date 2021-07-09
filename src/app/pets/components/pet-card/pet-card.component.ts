import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pet } from '../../models/pet';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.scss']
})
export class PetCardComponent implements OnInit {

  @Input() pet: Pet;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.pet);
  }

  navigateToEdit() {
    this.router.navigate(['/app/create'], { queryParams: { petId: this.pet.attributes.id } })
  }

}

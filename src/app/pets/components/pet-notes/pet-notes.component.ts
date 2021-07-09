import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserNote } from '../../models/user-note';
import { PetsDataService } from '../../services/pets-data.service';

@Component({
  selector: 'app-pet-notes',
  templateUrl: './pet-notes.component.html',
  styleUrls: ['./pet-notes.component.scss']
})
export class PetNotesComponent implements OnInit {

  @Input() petId: string;
  userNotes: UserNote[] = []

  constructor(private authService: AuthService, private petsService: PetsDataService) { }

  ngOnInit() {
    const user = this.authService.getUser();
    this.petsService.getUserNotes().subscribe(userNotes => {
      this.userNotes = userNotes.filter(userNote => userNote.attributes.petId === this.petId);
    });
  }

}

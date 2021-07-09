import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserNote } from '../../models/user-note';
import { PetsDataService } from '../../services/pets-data.service';

@Component({
  selector: 'app-pet-notes',
  templateUrl: './pet-notes.component.html',
  styleUrls: ['./pet-notes.component.scss']
})
export class PetNotesComponent implements OnInit, OnDestroy {

  @Input() petId: string;
  userNotes: UserNote[] = []
  userNotes$: Subscription

  constructor(private authService: AuthService, private petsService: PetsDataService) { }

  ngOnInit() {
    this.getNotes();
    this.userNotes$ = this.petsService.addUserNoteSubject.subscribe(() => {
      this.getNotes();
    })
  }

  deleteUserNote(userNote: UserNote) {
    this.petsService.deleteUserNote(userNote.id).subscribe(() => {
      this.getNotes();
    });
  }

  getNotes() {
    this.petsService.getUserNotes().subscribe(userNotes => {
      this.userNotes = userNotes.filter(userNote => userNote.attributes.petId === this.petId);
    });
  }

  ngOnDestroy(): void {
    this.userNotes$.unsubscribe();
  }
}

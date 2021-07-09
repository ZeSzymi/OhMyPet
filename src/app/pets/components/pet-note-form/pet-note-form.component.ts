import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PetsDataService } from '../../services/pets-data.service';

@Component({
  selector: 'app-pet-note-form',
  templateUrl: './pet-note-form.component.html',
  styleUrls: ['./pet-note-form.component.scss']
})
export class PetNoteFormComponent implements OnInit {

  petNoteForm: FormGroup;
  @Input() petId: string;

  constructor(private petsService: PetsDataService, private authService: AuthService) { }

  ngOnInit() {
    this.petNoteForm = new FormGroup({
      name: new FormControl("Visit"),
      date: new FormControl(new Date()),
      duration: new FormControl(30),
    })
  }

  addUserNote() {
    const date = new Date(this.petNoteForm.value.date.getTime() - (this.petNoteForm.value.date.getTimezoneOffset() * 60000 ))
    .toISOString()
    .split("T")[0];
    const name = this.petNoteForm.value.name
    const duration = this.petNoteForm.value.duration
    const userId = this.authService.getUser().userId;
    this.petsService.addUserNote(userId, name, this.petId, duration, date)
      .subscribe(() => this.petsService.addUserNoteSubject.next())
  }

}

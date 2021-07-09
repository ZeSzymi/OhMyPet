import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pet-note-form',
  templateUrl: './pet-note-form.component.html',
  styleUrls: ['./pet-note-form.component.scss']
})
export class PetNoteFormComponent implements OnInit {

  petNoteForm: FormGroup;
  @Input() petId: string;

  constructor() { }

  ngOnInit() {
    this.petNoteForm = new FormGroup({
      name: new FormControl("Visit"),
      duration: new FormControl(30),
      date: new FormControl(new Date)
    })
  }

}

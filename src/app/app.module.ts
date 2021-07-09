import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { HeaderComponent } from './core/header/header.component';
import { PetsDashboardComponent } from './pets/components/pets-dashboard/pets-dashboard.component';
import { TokenInterceptor } from './auth/services/token-interceptor.service';
import { PetCardComponent } from './pets/components/pet-card/pet-card.component';
import { BreedsResolver } from './pets/resolvers/breeds-resovler';
import { SpeciesResolver } from './pets/resolvers/species-resolver';
import { PetFiltersComponent } from './pets/components/pet-filters/pet-filters.component';
import { PetFormComponent } from './pets/components/pet-form/pet-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PreloadComponent } from './core/preload/preload.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PetNotesComponent } from './pets/components/pet-notes/pet-notes.component';
import { PetNoteFormComponent } from './pets/components/pet-note-form/pet-note-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PreloadComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    PetsDashboardComponent,
    PetCardComponent,
    PetFiltersComponent,
    PetFormComponent,
    PetNotesComponent,
    PetNoteFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    TokenInterceptor,
    BreedsResolver,
    SpeciesResolver,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

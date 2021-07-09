import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';
import { PreloadComponent } from './core/preload/preload.component';
import { PetFormComponent } from './pets/components/pet-form/pet-form.component';
import { PetsDashboardComponent } from './pets/components/pets-dashboard/pets-dashboard.component';
import { BreedsResolver } from './pets/resolvers/breeds-resovler';
import { SpeciesResolver } from './pets/resolvers/species-resolver';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'app', component: PreloadComponent,
    canActivate: [AuthGuard],
    resolve: { species : SpeciesResolver, breeds: BreedsResolver },
    children: [
      { 
        path: 'dashboard', 
        component: PetsDashboardComponent, 
      },
      { 
        path: 'create', 
        component: PetFormComponent
      }
    ]
  },
  { path: '',   redirectTo: '/app/dashboard', pathMatch: 'full' },
  { path: '**', component: PetsDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

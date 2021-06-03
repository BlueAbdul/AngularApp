import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { EnregistrementComponent } from './enregistrement/enregistrement.component';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { EditUserComponent } from './edit-user/edit-user.component'


const routes: Routes = [
  {path: 'enregistrement', component: EnregistrementComponent },
  {path: 'edit-user', component: EditUserComponent },
  {path: 'login', component: ConnexionComponent},
  {path: 'tasks', component: TaskListComponent},
  {path: '', component: HomeComponent },
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

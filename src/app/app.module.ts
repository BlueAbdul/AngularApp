import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { EnregistrementComponent } from './enregistrement/enregistrement.component';
import { TaskListComponent } from './task-list/task-list.component';

import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    FooterComponent,
    ConnexionComponent,
    EnregistrementComponent,
    TaskListComponent,
    HomeComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    DragDropModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowContrasenhaComponent } from './components/show-contrasenha/show-contrasenha.component';

import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [ProfileComponent, ShowContrasenhaComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ClipboardModule

  ]
})
export class ProfileModule { }

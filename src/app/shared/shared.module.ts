import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { NgModule } from '@angular/core';
import { WarningModalComponent } from './components/warning-modal/warning-modal.component';
import { CardSliderComponent } from './components/card-slider/card-slider.component';

@NgModule({
  declarations: [WarningModalComponent, CardSliderComponent],
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  exports: [CardSliderComponent],
})
export class SharedModule {}

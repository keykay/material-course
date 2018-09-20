import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { FlexboxComponent } from './flexbox/flexbox.component';

const routes: Routes = [
  { path: 'buttons', component: ButtonsComponent },
  { path: 'flexbox', component: FlexboxComponent },
  { path: '**', redirectTo: 'buttons' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DemoRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../shared/material.module';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { Routes, RouterModule } from '@angular/router';
import { ContactmanagerAppComponent } from './contactmanager-app.component';

const ROUTES: Routes = [
  {
    path: '', component: ContactmanagerAppComponent,
    children: [
      { path: '', component: MainContentComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [ContactmanagerAppComponent, ToolbarComponent, MainContentComponent, SideNavComponent]
})
export class ContactManagerModule { }

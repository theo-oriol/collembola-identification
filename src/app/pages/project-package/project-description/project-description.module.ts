import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDescriptionComponent } from './project-description.component';

const routes: Routes = [
  {
    path:'',
    component: ProjectDescriptionComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  
})

export class ProjectDescriptionModule { }

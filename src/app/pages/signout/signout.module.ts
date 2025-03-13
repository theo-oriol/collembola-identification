import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SignoutComponent } from './signout.component';

const routes: Routes = [
  {
    path:'',
    component: SignoutComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    
  ]
})
export class SignoutModule { }

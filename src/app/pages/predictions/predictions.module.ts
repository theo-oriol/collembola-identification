import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionsComponent } from './predictions.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path:'',
    component: PredictionsComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  
})
export class PredictionsModule {
 }

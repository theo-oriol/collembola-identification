import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UploadImgComponent } from './upload-img.component';



const routes: Routes = [
  {
    path:'',
    component: UploadImgComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  
})

export class UploadImgModule { }

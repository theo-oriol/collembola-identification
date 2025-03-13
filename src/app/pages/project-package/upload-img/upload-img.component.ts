import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-upload-img',
  imports: [MatSidenavModule,CommonModule],
  templateUrl: './upload-img.component.html',
  styleUrl: './upload-img.component.css'
})
export class UploadImgComponent {
  projectId!: string;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    // Extract the ID from the URL
    
    this.projectId = this.route.snapshot.paramMap.get('id') || '';


  }
}

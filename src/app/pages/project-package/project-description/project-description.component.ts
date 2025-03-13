import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-description',
  imports: [MatSidenavModule,CommonModule],
  templateUrl: './project-description.component.html',
  styleUrl: './project-description.component.css'
})
export class ProjectDescriptionComponent implements OnInit{
  projectId!: string;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    // Extract the ID from the URL
    
    this.projectId = this.route.snapshot.paramMap.get('id') || '';


  }

}

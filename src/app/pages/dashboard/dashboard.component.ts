import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

import { DashboardService } from './dashboard.service';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,MatCardModule,MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
  projects: any[] = [];
  api_url: string = "http://localhost:3000/get-image";

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getProjects().subscribe((res: any) => {
      this.projects = res.projects;
      console.log("Projets",this.projects);
      this.dashboardService.fetchImagesForProjects(this.projects)
    }
  );}

}

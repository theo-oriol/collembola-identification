import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { HttpClient} from '@angular/common/http';
import { HttpClientModule  } from '@angular/common/http';
import { Project } from './project.model';


@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [CommonModule,MatCardModule,HttpClientModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  constructor(private http: HttpClient) {}
  projects: Project[] = [];

  fetchProjects() {
    return this.http.get(`http://localhost:3000/get-list-projects`);
  }

  Init() {

    this.fetchProjects().subscribe({
      next: (data:any) => {
        this.projects = data;
      },
      error: (err) => {
        console.error("Error fetching projects:", err);
      }
    });

  }
  
  ngOnInit() {
    this.Init(); 
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { HttpClientModule  } from '@angular/common/http';
import { Project } from '../project.model';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-dataset',
  imports: [CommonModule,MatCardModule,MatSidenavModule,MatInputModule,MatFormFieldModule,HttpClientModule],
  templateUrl: './dataset.component.html',
  styleUrl: './dataset.component.css'
})
export class DatasetComponent implements OnInit{
projectId!: string; // Store the ID from the URL
  project_info: Project | null = null;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  fetchProject(id: string) {
    return this.http.get(`http://localhost:3000/get-projects/${id}`);
  }

  ngOnInit() {
    // Extract the ID from the URL
    
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Project ID:', this.projectId);

    this.fetchProject(this.projectId).subscribe({
      next: (data:any) => {
        console.log('Project data:', data);
        this.project_info = data;
      },
      error: (err) => {
        console.error("Error fetching projects:", err);
      }
    });

  }

}

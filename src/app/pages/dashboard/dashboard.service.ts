import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../components/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000';
  
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  
  getProjects(): any {
     // ✅ Get token
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // ✅ Attach token in Authorization header
    });
    return this.http.get(`${this.apiUrl}/user-projects/`, { headers });
  }

  fetchImagesForProjects(projects:any []): void {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    projects.forEach((project) => {
      if (project.firstImage && project.firstImage.url) {
        this.http.get(`${this.apiUrl}/get-image/${project.firstImage.url}`, { headers, responseType: 'blob' })
          .subscribe((data: Blob) => {
            const objectUrl = URL.createObjectURL(data);
            project.firstImage.blobUrl = objectUrl; // Set blob URL for each project image
          }, error => {
            console.error('Error fetching image for project', project.id, error);
          });
      }
    });
  }
}

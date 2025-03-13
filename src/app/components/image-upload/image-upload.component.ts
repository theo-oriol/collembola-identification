import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule  } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DataFetchService } from './data-fetching';
import { FileUploadService } from './file-upload';
import { DragDirective } from './dragDrop';
 

const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/bmp',
];

@Component({
  standalone:true,
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  imports:[
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    DragDirective 
  ],
  providers: [FileUploadService,DataFetchService],
})
export class ImageUploadComponent {
  fileName = "";
  imageId = "";

  @Output() info_imgs = new EventEmitter<any>();
  
  constructor(
    private fileUploadService: FileUploadService,
    private dataFetchService: DataFetchService
  ) {}

  onFileSelected(event: any) {
    let file : File;
    
    if (event instanceof FileList) {
      file = event[0]; // Drag-and-Drop
    } else if (event.target?.files.length > 0) {
      file = event.target.files[0]; // File Input
    } else {
      return; // No file selected
    }
    if (file && ALLOWED_FILE_TYPES.includes(file.type)) {
      this.fileName = file.name;

      this.fileUploadService.uploadFile(file).subscribe({
        next: (response: any) => {
          console.log('Upload successful', response);
          this.imageId = response.id;


          this.dataFetchService.fetchImageInfo(this.imageId).subscribe({
            next: (info) => {
              console.log('Image info:', info);
              this.info_imgs.emit({"info":info,"url":`http://localhost:3000/get-image/${this.imageId}`});}
            ,
            error: (err) => console.error('Error fetching image info:', err),
          });
        },
        error: (err) => console.error('Error uploading file:', err),
      });
    }
  }
}


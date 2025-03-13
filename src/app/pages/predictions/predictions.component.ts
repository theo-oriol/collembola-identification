import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from '../../components/image-upload/image-upload.component';
import { DrawingService } from './drawing_pred';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-predictions',
  imports: [ImageUploadComponent,CommonModule,MatGridListModule,MatTabsModule],
  templateUrl: './predictions.component.html',
  styleUrl: './predictions.component.css',
  providers:[DrawingService]
})
export class PredictionsComponent {
  info_imgs: any;
  imageUrl: string = "";

  constructor(
      private drawingService: DrawingService,
    ) {}

    

  handleJsonReceived(jsonData: any) {
    this.info_imgs = jsonData["info"];
    this.imageUrl = jsonData["url"];
    console.log('Received JSON from ImageUpload:', this.info_imgs, this.imageUrl);
  }
  onImageLoad(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    this.drawingService.drawRectable(this.info_imgs["coord"], imgElement.height, imgElement.width,this.imageUrl);
  }


}

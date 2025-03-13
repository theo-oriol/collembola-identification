import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataFetchService {
  constructor(private http: HttpClient) {}

  fetchImageInfo(imageId: string) {
    return this.http.get(`http://localhost:3000/retrieve-pred/${imageId}`);
  }
}
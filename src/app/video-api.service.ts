import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoApiService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  // This method will be used to get all videos links from the History
  getAllHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/history`);
  }

  // This method will be used to get all videos links from the Bookmarks
  getAllBookmarks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookmarks`);
  }

  // This method will be used to get a single video link from the History
  postHistoryByVideoUrl(videoUrl: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/history`, { videoUrl });
  }

  // This method will be used to get a single video link from the Bookmarks
  postBookmarksByVideoUrl(videoUrl: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookmarks`, { videoUrl });
  }

  // This method will be used to clear all videos links from the History
  clearAllHistory(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/history`);
  }

  // This method will be used to delete a single video link from the Bookmarks
  deleteBookmarksByVideoUrl(videoUrl: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bookmarks?videoUrl=${videoUrl}`);
  }

}

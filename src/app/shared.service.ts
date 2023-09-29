import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VideoApiService } from './video-api.service';

export type VideoItem = {
  id: number;
  videoUrl: string;
  lastAccess: Date;
};

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  [x: string]: any;
  private videoUrlSubject = new BehaviorSubject<string>('');
  videoUrl$ = this.videoUrlSubject.asObservable();

  private history = new BehaviorSubject<any>([]);
  history$ = this.history.asObservable();

  constructor(private videoService: VideoApiService) {
    this.videoService.getAllHistory().subscribe((videos) => {
      this.history.next(videos.map((x: VideoItem) => x.videoUrl));
    });
  }

  setVideoUrl(videoUrl: string) {
    // Check if the videoUrl is already in the history
    const history = this.history.getValue();
    const index = history.indexOf(videoUrl);
    if (index !== -1) {
      history.splice(index, 1);
    }
    this.videoUrlSubject.next(videoUrl);
    let vids: string[] = [...this.history.getValue(), videoUrl];
    this.history.next(vids);
  }

  getBookmarks() {
    return this.videoService.getAllBookmarks();
  }
}
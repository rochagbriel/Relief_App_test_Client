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
    this.videoUrlSubject.next(videoUrl);
    let vids: string[] = [...this.history.getValue(), videoUrl];
    this.history.next(vids);
  }
}
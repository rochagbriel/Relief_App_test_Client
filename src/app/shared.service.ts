import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private videoUrlSubject = new BehaviorSubject<string>('');
  videoUrl$ = this.videoUrlSubject.asObservable();

  setVideoUrl(videoUrl: string) {
    this.videoUrlSubject.next(videoUrl);
  }
}
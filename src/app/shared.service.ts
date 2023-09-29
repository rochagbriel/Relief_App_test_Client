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

  private bookmarks = new BehaviorSubject<any>([]);
  bookmarks$ = this.bookmarks.asObservable();

  constructor(private videoService: VideoApiService) {
    this.videoService.getAllHistory().subscribe((videos) => {
      this.history.next(videos.map((v: VideoItem) => v.videoUrl));
    });

    this.videoService.getAllBookmarks().subscribe((bookmarks) => {
      this.bookmarks.next(bookmarks.map((b: VideoItem) => b.videoUrl));
    })
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

  setBookmarks(videoUrl: string) {
    const bookmarks = this.bookmarks.getValue();
    const index = bookmarks.indexOf(videoUrl);
    if (index !== -1) {
      bookmarks.splice(index, 1);
    }
    let book: string[] = [...this.bookmarks.getValue(),  videoUrl];
    this.bookmarks.next(book);
  }

  removeBookmark(videoUrl: string) {
    const bookmarks = this.bookmarks.getValue();
    const index = bookmarks.indexOf(videoUrl);
    if (index !== -1) {
      bookmarks.splice(index, 1);
    }
    this.bookmarks.next(bookmarks);
  }

  getBookmarks() {
    return this.videoService.getAllBookmarks();
  }
}
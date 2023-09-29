import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { VideoApiService } from '../video-api.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  videoUrl: string = '';

  constructor(
    private router: Router,
    private videoService: VideoApiService,
    private sharedService: SharedService
  ) {
    this.sharedService.videoUrl$.subscribe((url) => {
      this.videoUrl = url;
    });
  }

  bookmarksItems = this.sharedService.bookmarks$.pipe(
    map((bookmark) => {
      return bookmark;
    })
  );

  ngOnInit(): void {
  }

  addBookmarks() {
    this.videoService.postBookmarksByVideoUrl(this.videoUrl).subscribe((res) => {
      this.bookmarksItems = res;
    });
    this.sharedService.setBookmarks(this.videoUrl);
  
  }



  deleteBookmark(item: string) {
    this.videoService.deleteBookmarksByVideoUrl(item).subscribe((res) => {
      this.bookmarksItems = res;
    });
    this.sharedService.removeBookmark(this.videoUrl);
  }

  playVideo(videoUrl: string) {
    this.sharedService.setVideoUrl(videoUrl);
  }
}

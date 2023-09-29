import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { VideoApiService } from '../video-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  videoUrl: string = '';
  BookmarksItems: any = [];

  constructor(
    private router: Router,
    private videoService: VideoApiService,
    private sharedService: SharedService
  ) {
    this.sharedService.videoUrl$.subscribe((url) => {
      this.videoUrl = url;
    });
  }

  ngOnInit(): void {
    // get how many videos are bookmarked when app runs for the first time
    this.sharedService.getBookmarks().subscribe((res) => {
      return this.BookmarksItems = res;
    }
    );
  }

  addBookmarks() {
    this.videoService.postBookmarksByVideoUrl(this.videoUrl).subscribe((res) => {
      this.BookmarksItems = res;
    });
  }

  goToMyBookmarks() {
    this.videoService.getAllBookmarks().subscribe((res) => {
      this.BookmarksItems = res;
      this.router.navigate(['/bookmarks']);
    });
  }

  deleteBookmark(item: string) {
    this.videoService.deleteBookmarksByVideoUrl(item).subscribe((res) => {
      this.BookmarksItems = res;
    });
  }

  playVideo(videoUrl: string) {
    this.sharedService.setVideoUrl(videoUrl);
  }
}

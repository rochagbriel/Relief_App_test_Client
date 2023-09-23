import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { VideoApiService } from '../video-api.service';

@Component({
  selector: 'bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})

export class BookmarksComponent {
  videoUrl: string = '';
  BookmarksItems: any = [];

  constructor(private videoService: VideoApiService, private sharedService: SharedService) {
    this.sharedService.videoUrl$.subscribe((url) => {
      this.videoUrl = url;
    });
  }

  addBookmarks() { 
    const videoUrl = this.videoUrl;
    this.videoService.postBookmarksByVideoUrl(videoUrl).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  seeMyBookmarks() {
      this.videoService.getAllBookmarks().subscribe((res) => {
        this.BookmarksItems = res;
      });
    }

    deleteBookmark(item: string) {
      this.videoService.deleteBookmarksByVideoUrl(item).subscribe((res) => {
        this.BookmarksItems = res;
      });
    }
}

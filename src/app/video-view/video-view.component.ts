import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from '../shared.service';

declare var YT: any;

@Component({
  selector: 'video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss'],
})

export class VideoViewComponent {
  @ViewChild('youtubePlayer', { static: true })
  player!: ElementRef;
  videoUrl: string = '';
  videoId: string = '';

  constructor(private sharedService: SharedService) {
    this.sharedService.videoUrl$.subscribe((url) => {
      this.videoUrl = url;
      this.videoId = this.getVideoId(this.videoUrl);
      this.loadYouTubeIframeAPI();
    });
  }

  getVideoId(url: string) {
    const videoId = url.split('v=')[1];
    return videoId;
  }

  loadYouTubeIframeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }
}

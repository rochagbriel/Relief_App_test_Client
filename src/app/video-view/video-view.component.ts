import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss'],
})
export class VideoViewComponent {
  videoUrl: string = '';
  videoId: string = '';

  constructor(private sharedService: SharedService) {
    this.sharedService.videoUrl$.subscribe((url) => {
      this.videoUrl = url;
      this.videoId = this.getVideoId(this.videoUrl);
    });
  }

  getVideoId(url: string) {
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return videoId.substring(0, ampersandPosition);
    }
    return videoId;
  }

}

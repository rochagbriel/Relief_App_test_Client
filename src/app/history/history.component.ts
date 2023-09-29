import { Component, OnInit } from '@angular/core';
import { VideoApiService } from '../video-api.service';
import { SharedService } from '../shared.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  historyItems = this.sharedService.history$.pipe(
    map((x) => {
      console.log(x);
      return x;
    })
  );

  constructor(
    private videoService: VideoApiService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {}

  clearHistory() {
    this.videoService.clearAllHistory().subscribe((res) => {
      this.historyItems = res;
    });
  }

  playVideo(videoUrl: string) {
    this.sharedService.setVideoUrl(videoUrl);
  }
}

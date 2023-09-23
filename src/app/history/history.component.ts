import { Component, OnInit } from '@angular/core';
import { VideoApiService } from '../video-api.service';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  historyItems: any = [];

  constructor(private videoService: VideoApiService) {}

  ngOnInit(): void {
    this.videoService.getAllHistory().subscribe((res) => {
      this.historyItems = res;
    });
  }

  clearHistory() {
    this.videoService.clearAllHistory().subscribe((res) => {
      this.historyItems = [];
    });
  }
}

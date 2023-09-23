import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VideoApiService } from '../video-api.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  videoForm: FormGroup;
  videoUrl: string = '';

  constructor(private fb: FormBuilder, private videoService: VideoApiService, private sharedService: SharedService) {
    this.videoForm = this.fb.group({
      videoUrl: ['', Validators.required]
    });
  }

  onSubmit() {
    const videoUrl = this.videoForm.value.videoUrl;

    this.sharedService.setVideoUrl(videoUrl);
    this.videoService.postHistoryByVideoUrl(videoUrl).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

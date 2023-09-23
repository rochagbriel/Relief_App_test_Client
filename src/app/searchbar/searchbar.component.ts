import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VideoApiService } from '../video-api.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  videoForm: FormGroup;
  videoUrl: string = '';

  constructor(private fb: FormBuilder, private videoService: VideoApiService) {
    this.videoForm = this.fb.group({
      videoUrl: ['', Validators.required]
    });
  }

  onSubmit() {
    this.videoUrl = this.videoForm.value.videoUrl;
    this.videoService.postHistoryByVideoUrl(this.videoUrl).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

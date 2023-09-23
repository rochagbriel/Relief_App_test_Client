import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { HistoryComponent } from './history/history.component';
import { VideoViewComponent } from './video-view/video-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/video-view', pathMatch: 'full' },
  { path: 'video-view', component: VideoViewComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'bookmarks', component: BookmarksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

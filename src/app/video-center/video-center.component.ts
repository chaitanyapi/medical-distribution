import { Component, OnInit } from '@angular/core';
import { Video } from "../video";
import { VideoService } from '../video.service';
@Component({
  selector: 'video-center',
  templateUrl: './video-center.component.html',
  //styleUrls: ['./video-center.component.css'],
})
export class VideoCenterComponent implements OnInit {

  videos:Array<Video>;
  selectedVideo : Video;
  hidden : boolean = true; 
  private showList : boolean = true;
  constructor(private videoService : VideoService) { }

  ngOnInit() {
    this.videoService.getVideos()
        .subscribe(resVideoData => this.videos = resVideoData);
  }

  onSelectVideo(video:Video){
    this.selectedVideo = video;
  }

  onSubmit(video : Video){
    
    this.videoService.addVideo(video)
        .subscribe( newVideo => {
          this.videos.push(newVideo);
          this.hidden=true;
          this.showList = true;
          this.selectedVideo = newVideo;
        })
  }

  onUpdateVideo(video : Video){
    this.videoService.updateVideo(video)
        .subscribe( updateVideo => video = updateVideo);
        this.selectedVideo = null;
  }
  newVideo(){
    this.hidden = false;
    this.showList = false;
  }
  cancelVideo(){
    this.hidden=true;
    this.showList = true;
  }
}

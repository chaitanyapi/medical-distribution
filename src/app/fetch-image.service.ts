import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
// import { Products } from "./product";

@Injectable()
export class FetchImageService {

  private url="/api/showimage/";

  constructor(private http:Http) { }

  // updateVideo(video : Video){
  //   let headers = new Headers({'Content-Type':'application/json'});
  //   let options = new RequestOptions({headers : headers});

  //   return this.http.put(this.updateUrl + video._id,JSON.stringify(video), options)
  //           .map((response : Response)=> response.json());
  // }

  getVideos(imageId){
    return this.http.get(this.url + imageId)
              .map((response : Response)=> 
                // console.log(response);
                response);
  }

}

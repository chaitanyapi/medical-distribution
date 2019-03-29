import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { Video } from "./video";
@Injectable()
export class VideoService {

  private url="/api/videos";
  private postUrl = "/api/videos";
  private updateUrl = "/api/videos/";

  constructor(private http:Http) { }

  getVideos(){
    return this.http.get(this.url)
              .map((response : Response)=> response.json());
  }
  addVideo(video : Video){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.post(this.postUrl, JSON.stringify(video), options)
                .map((response : Response)=> response.json());
  }

  updateVideo(video : Video){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.put(this.updateUrl + video._id,JSON.stringify(video), options)
            .map((response : Response)=> response.json());
  }

  // getProducts(search, searchBy){
  //   return this.http.get(this.listProd, {params: {search: search, searchBy: searchBy}})
  //                   .map((response : Response)=> response.json());
  // }


  // addProduct(product : Products){
  //   let headers = new Headers({'Content-Type':'application/json'});
  //   let options = new RequestOptions({headers : headers, responseType:ResponseContentType.Blob});
  //   return this.http.post(this.postProd, JSON.stringify(product), options)
  //               .map((response:Response)=> response.json());
  // }
}

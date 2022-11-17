import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationInfoService {

  constructor(private http: HttpClient) { }

  getLocationInfo(address: string): Observable<JSON> {
    return this.http.get<JSON>(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBwvLprVfcd1yl2skYYkGk6clqw49rnRCQ&language=en`)
  }

}

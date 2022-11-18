import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IJob } from 'src/app/interfaces/job.interface';

@Injectable({
  providedIn: 'root'
})
export class JobInfoService {

  constructor(private http: HttpClient) { }

  getJobList(): Observable<IJob[]> {
    return this.http.get<IJob[]>('https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu')
  }
}

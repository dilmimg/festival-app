import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicFestival } from '../models/music.festival';

@Injectable({
  providedIn: 'root'
})
export class MusicFestivalService {

  url = '/api/v1/festivals';

  constructor(private httpClient: HttpClient) { }

  public getMusicFestivals(): Observable<MusicFestival[]> {
    return this.httpClient.get<MusicFestival[]>(this.url);
  }
}

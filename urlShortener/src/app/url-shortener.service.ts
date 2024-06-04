import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'any'
})
export class UrlShortenerService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  generateShortUrl(originalUrl: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/originalUrl`, {"originalUrl": originalUrl})
  }
  getOriginalUrl(shortUrl: string): Observable<any> {
    const apiUrl = shortUrl;
    return this.http.get(apiUrl);
  }
}

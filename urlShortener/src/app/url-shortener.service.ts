import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class UrlShortenerService {

  constructor(private http: HttpClient) { }

  generateShortUrl(originalUrl: string): Observable<any> {
    const apiUrl = "http://localhost:8080/originalUrl";
    return this.http.post(apiUrl, {"originalUrl": originalUrl})
  }
  getOriginalUrl(shortUrl: string): Observable<any> {
    const apiUrl = shortUrl;
    return this.http.get(apiUrl);
  }
}

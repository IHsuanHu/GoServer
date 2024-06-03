import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class UrlShortenerService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  generateShortUrl(originalUrl: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/originalUrl`, {"originalUrl": originalUrl})
  }
  getOriginalUrl(shortUrl: string): Observable<any> {
    const apiUrl = shortUrl;
    return this.http.get(apiUrl);
  }
}

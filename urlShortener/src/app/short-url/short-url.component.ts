import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlShortenerService } from '../url-shortener.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-short-url',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './short-url.component.html',
  styleUrl: './short-url.component.css'
})
export class ShortUrlComponent {
  originalUrl = '';
  shortUrl = '';
  errorMessage = '';

  constructor(private urlShortenerService: UrlShortenerService) {}

  getOriginalUrl(): void{

    this.errorMessage = '';
    const prefix = `${environment.apiUrl}/shortUrl/`;
    if (!this.shortUrl.startsWith(prefix) || this.shortUrl.slice(prefix.length).length !== 7) {
      this.errorMessage = 'Invalid URL or hash length. Please check your input.';
      return;  
    }

    this.urlShortenerService.getOriginalUrl(this.shortUrl).subscribe({
      next: (data) => {
        this.originalUrl = data.originalUrl
      }, 
      error: (error) =>{
        console.log("Error", error);
        this.originalUrl = "Failed to get original URL."
      }
    });
  }
}

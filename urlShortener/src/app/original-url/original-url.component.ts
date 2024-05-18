import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlShortenerService } from '../url-shortener.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-original-url',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './original-url.component.html',
  styleUrl: './original-url.component.css'
})
export class OriginalUrlComponent {
  originalUrl = "";
  result = '';
  restoreUrl = '';
  errorMessage = '';
  constructor(private urlShortenerService: UrlShortenerService) {}
  generateShortUrl(): void {
    this.result = '';
    this.errorMessage = '';

    if (this.originalUrl) {
      if (this.isValidUrl(this.originalUrl)){
        this.urlShortenerService.generateShortUrl(this.originalUrl).subscribe({
          next: (data) => {
            this.result = "http://localhost:8080/shortUrl/"+ data.shortUrl;
            this.getOriginalUrl(this.result);
          },
          error: (error) => {
            console.log("Error", error);
            this.result = "Failed to generate short URL.";
          }
        });
      } else {
        this.errorMessage = "Invalid URL format. Please check your input.";
      }
    } else {
      this.result = "Please enter a URL."
    }
  }
  getOriginalUrl(shortUrl: string): void {
    this.urlShortenerService.getOriginalUrl(shortUrl).subscribe({
      next: (data) =>{
        this.restoreUrl = data.originalUrl;
      },
      error: (error) => {
        console.log("Error", error);
        this.restoreUrl = "Failed to get original URL."
      }
    })
  }


  isValidUrl(url: string): boolean {
    const pattern = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ 
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
      '(\\#[-a-z\\d_]*)?$','i'); 
    return !!pattern.test(url);
  }
  copyUrl(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
}

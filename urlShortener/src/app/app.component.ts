import { Component } from '@angular/core';
import { UrlShortenerService } from './url-shortener.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Url Shortener';
  originalUrl: string = '';
  result: string = '';
  reverseUrl: string = '';

  constructor(private urlShortenerService: UrlShortenerService) {  }

  generateShortUrl(): void {
    if (this.originalUrl) {
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
      this.result = "Please enter a URL."
    }
  }
  getOriginalUrl(shortUrl: string): void {
    this.urlShortenerService.getOriginalUrl(shortUrl).subscribe({
      next: (data) =>{
        this.reverseUrl = data.original;
      },
      error: (error) => {
        console.log("Error", error);
        this.reverseUrl = "Failed to get original URL."
      }
    })
  }


  isValidUrl(url: string): boolean {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
  }
}

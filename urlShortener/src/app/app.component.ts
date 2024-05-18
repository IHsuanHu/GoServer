import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { OriginalUrlComponent } from './original-url/original-url.component';
import { ShortUrlComponent } from './short-url/short-url.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HttpClientModule, OriginalUrlComponent, ShortUrlComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Url Shortener';
  showText = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showText = !['/shorturl', '/originalurl'].includes(event.url)
      }
    })
  }
}

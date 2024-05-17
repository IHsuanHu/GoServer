import { Routes } from '@angular/router';

import { ShortUrlComponent } from './short-url/short-url.component';
import { OriginalUrlComponent } from './original-url/original-url.component';

export const routes: Routes = [
    
    {path: 'shorturl', component: ShortUrlComponent},
    {path: 'originalurl', component: OriginalUrlComponent}
   
];

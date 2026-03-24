import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { ContentConversion } from './pages/content-conversion/content-conversion';
import { DigitalSolution } from './pages/digital-solution/digital-solution';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'about', component: About },
    { path: 'contact', component: Contact },
    { path: 'content-conversion', component: ContentConversion },
    { path: 'digital-solution', component: DigitalSolution },
];

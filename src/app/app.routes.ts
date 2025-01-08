import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'signin', component: SigninComponent },
];


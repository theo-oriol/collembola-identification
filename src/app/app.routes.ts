import { Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';
import { NoAuthGuard } from './components/auth/noauth.guard';
import { SigninComponent } from './pages/signin/signin.component';
import { PredictionsComponent } from './pages/predictions/predictions.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { DatasetComponent } from './pages/project-package/dataset/dataset.component';
import { ProjectDescriptionComponent } from './pages/project-package/project-description/project-description.component';
import { UploadImgComponent } from './pages/project-package/upload-img/upload-img.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignoutComponent } from './pages/signout/signout.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'login', component: SigninComponent, canActivate: [NoAuthGuard] },
    { path: 'predictions', component: PredictionsComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'project/:id/description', component: ProjectDescriptionComponent },
    { path: 'project/:id/dataset', component: DatasetComponent },
    { path: 'project/:id/upload-img', component: UploadImgComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'logout', component: SignoutComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/home' }
];


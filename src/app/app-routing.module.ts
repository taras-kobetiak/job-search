import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobPageComponent } from './components/job-page/job-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/vacancies-list', pathMatch: 'full' },
  { path: 'vacancies-list', component: JobListComponent },
  { path: 'vacancies-list/:title', component: JobPageComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

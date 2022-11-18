import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobPageComponent } from './components/job-page/job-page.component';
import { MapsComponent } from './components/job-page/components/maps/maps.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    JobPageComponent,
    MapsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxStarRatingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

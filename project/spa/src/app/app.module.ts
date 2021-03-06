import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimerComponent } from './components/timer/timer.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { DonationComponent } from './components/donation/donation.component';
@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    LandingpageComponent,
    DonationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

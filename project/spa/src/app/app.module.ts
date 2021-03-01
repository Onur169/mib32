import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimerComponent } from './components/timer/timer.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TimerComponent,
    LandingpageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimerComponent } from './components/timer/timer.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';

import { NavigationComponent } from './components/navigation/navigation.component';
import { MapComponent } from './components/map/map.component';
import { ThrowbacksComponent } from './components/throwbacks/throwbacks.component';
import { AllianceComponent } from './components/alliance/alliance.component';
@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    LandingpageComponent,
    NavigationComponent,
    MapComponent,
    ThrowbacksComponent,
    AllianceComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

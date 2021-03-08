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
//import {OlMapModule} from './modules/ol-map/ol-map.module'

import { NavigationComponent } from './components/navigation/navigation.component';
import { MapComponent } from './components/map/map.component';
import { ThrowbacksComponent } from './components/throwbacks/throwbacks.component';
@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    LandingpageComponent,
    NavigationComponent,
    MapComponent,
    ThrowbacksComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule
    //OlMapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

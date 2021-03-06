import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common'

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalFocusModule} from './cookie/modal-focus.module';

import { TimerComponent } from './components/timer/timer.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';

import { NavigationComponent } from './components/navigation/navigation.component';
import { MapComponent } from './components/map/map.component';
import { ThrowbacksComponent } from './components/throwbacks/throwbacks.component';
import { AllianceComponent } from './components/alliance/alliance.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FaqComponent } from './components/faq/faq.component';
import { ActiveComponent } from './components/active/active.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilleroneComponent } from './components/filler/fillerone/fillerone.component';
import { FillertwoComponent } from './components/filler/fillertwo/fillertwo.component';
import { FillerthreeComponent } from './components/filler/fillerthree/fillerthree.component';
import { FillerfourComponent } from './components/filler/fillerfour/fillerfour.component';
import { FillerfiveComponent } from './components/filler/fillerfive/fillerfive.component';
import { FillersixComponent } from './components/filler/fillersix/fillersix.component';
import { SocialMediaComponent } from './components/social-media/social-media.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    LandingpageComponent,
    NavigationComponent,
    MapComponent,
    ThrowbacksComponent,
    AllianceComponent,
    TestimonialsComponent,
    ActiveComponent,
    FooterComponent,
    FaqComponent,
    ActiveComponent,
    FilleroneComponent,
    FillertwoComponent,
    FillerthreeComponent,
    FillerfourComponent,
    FillerfiveComponent,
    FillersixComponent,
    SocialMediaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule,
    NgbdModalFocusModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

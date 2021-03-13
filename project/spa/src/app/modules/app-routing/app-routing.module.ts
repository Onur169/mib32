/**
 * @param createdBy
 * Christian Knoth
 * @param author
 * Christian Knoth
 * @param summary
 * Organisiert den Router-Outlet um weitere Optionen als Content neben der landing-Page offen zu halten.
 */

import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ActiveComponent } from 'src/app/components/active/active.component';
import { AllianceComponent } from 'src/app/components/alliance/alliance.component';
import { FaqComponent } from 'src/app/components/faq/faq.component';
import { LandingpageComponent } from 'src/app/components/landingpage/landingpage.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { TestimonialsComponent } from 'src/app/components/testimonials/testimonials.component';
import { ThrowbacksComponent } from 'src/app/components/throwbacks/throwbacks.component';
import { TimerComponent } from 'src/app/components/timer/timer.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {path: 'Home', component: LandingpageComponent},
  {path: 'timer', component: TimerComponent},
  {path: 'map', component: MapComponent},
  {path: 'spenden', component: ActiveComponent},
  {path: 'buendnis', component: AllianceComponent},
  {path: 'persoenlichkeiten', component: TestimonialsComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'rueckblick', component: ThrowbacksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

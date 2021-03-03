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
import { LandingpageComponent } from 'src/app/components/landingpage/landingpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {path: 'Home', component: LandingpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

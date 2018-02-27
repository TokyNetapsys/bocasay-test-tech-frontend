import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListSurveysComponent} from './list-surveys/list-surveys.component';
import {DetailSurveyComponent} from './detail-survey/detail-survey.component';
import {homedir} from "os";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'surveys', component: ListSurveysComponent },
  { path: 'survey/:code', component: DetailSurveyComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

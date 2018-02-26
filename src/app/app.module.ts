import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {ListSurveysComponent} from './list-surveys/list-surveys.component';
import {SurveyService} from './services/survey.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DetailSurveyComponent} from './detail-survey/detail-survey.component';
import {AppRoutingModule} from './/app-routing.module';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    ListSurveysComponent,
    DetailSurveyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [
    SurveyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

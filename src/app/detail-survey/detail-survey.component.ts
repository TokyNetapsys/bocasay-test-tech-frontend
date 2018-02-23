import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SurveyService} from '../services/survey.service';
import {Location} from '@angular/common';
import {SurveyDetail} from '../model/SurveyDetail';

@Component({
  selector: 'app-detail-survey',
  templateUrl: './detail-survey.component.html',
  styleUrls: ['./detail-survey.component.css']
})
export class DetailSurveyComponent implements OnInit {

  surveyDetailList: SurveyDetail[];

  constructor(private route: ActivatedRoute,
              private surveyService: SurveyService,
              private location: Location) {
    this.route.params.subscribe( params => console.log(params) );
    console.log(this.route.snapshot.paramMap.get('code'));
  }

  ngOnInit() {
    this.getSurvey();
  }

  getSurvey(): void {
    // const code = this.route.params.;
    const code = this.route.snapshot.paramMap.get('code');
    this.surveyService.getSurveyDetailByCode(code).subscribe(surveyDetailList => this.surveyDetailList = surveyDetailList);
  }
}

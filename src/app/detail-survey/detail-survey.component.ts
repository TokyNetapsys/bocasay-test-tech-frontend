import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SurveyService} from '../services/survey.service';
import {Location} from '@angular/common';
import {SurveyDetail} from '../model/SurveyDetail';
import {Survey} from '../model/Survey';

@Component({
  selector: 'app-detail-survey',
  templateUrl: './detail-survey.component.html',
  styleUrls: ['./detail-survey.component.css']
})
export class DetailSurveyComponent implements OnInit {

  surveyDetailList: SurveyDetail[];
  currentSurvey: Survey;
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: any[] = [];
  public doughnutChartType = 'doughnut';

  constructor(private route: ActivatedRoute,
              private surveyService: SurveyService,
              private location: Location) {
    this.route.params.subscribe(params => console.log(params));
    console.log(this.route.snapshot.paramMap.get('code'));
  }

  ngOnInit() {
    this.getSurvey();
    console.log(this.surveyDetailList);
  }

  getSurvey(): void {
    const code = this.route.snapshot.paramMap.get('code');
    // used to get current survey
    this.surveyService.getSurveys().subscribe(surveys => this.currentSurvey = surveys.find(s => s.code === code));
    // use to get detail of survey
    this.surveyService.getSurveyDetailByCode(code).subscribe(surveyDetailList => {
      surveyDetailList.forEach(element => {
        // if survey type is qcm we tranform result to array of key value
        if (element.type === 'qcm') {
          const temp = new Map();
          for (const key in element.result) {
            temp.set(key, element.result[key]);
          }
          element.result = [...temp.entries()].sort();
          for (const [key, value] of element.result) {
            this.doughnutChartData.push(value);
            this.doughnutChartLabels.push(key);
            // console.log('cle:' + key, 'Value : ' + value);
          }
         console.log(Object.getOwnPropertyNames(element.result));
        }
        // if survey type is date we tranform result to array of date
        if (element.type === 'date') {
          console.log(element.result);
          const listDate = new Array();
          for (const item of element.result) {
            listDate.push(new Date(item));
          }
          element.result = listDate;
        }
      });
      this.surveyDetailList = surveyDetailList;
      console.log(this.surveyDetailList);
    });
  }
}

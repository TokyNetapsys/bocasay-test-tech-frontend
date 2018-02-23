import {Component, OnInit} from '@angular/core';
import {Survey} from '../model/Survey';
import {SurveyService} from '../services/survey.service';

@Component({
  selector: 'app-surveys-items',
  templateUrl: './list-surveys.component.html',
  styleUrls: ['./list-surveys.component.css']
})
export class ListItemsComponent implements OnInit {
  items: Survey[];

  constructor(private itemService: SurveyService) {
  }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems().subscribe(items => this.items = items);
  }
}

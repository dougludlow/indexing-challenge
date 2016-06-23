import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import * as _ from 'lodash';

import { ApiService } from './services/api.service';
import { Settings, Group, Entry } from './models';
import { BarChartComponent, LineChartComponent } from './components';

@Component({
  selector: 'indexing-challenge',
  directives: [BarChartComponent, LineChartComponent],
  providers: [HTTP_PROVIDERS, ApiService],
  template: `
    <div class="jumbotron">
      <h1> 
        Fairview Ward Youth<br />
        <small>{{total}} {{settings?.unitPlural?.toLowerCase()}} completed!</small>
      </h1>
      <div class="progress">
        <div class="progress-bar" [style.width]="total/settings?.goal*100 + '%'">{{total}}/{{settings?.goal}}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <bar-chart [settings]="settings" [groups]="groups" [entries]="entries"></bar-chart>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-md-12">
        <line-chart [settings]="settings" [groups]="groups" [entries]="entries"></line-chart>
      </div>
    </div>
  `
})
export class AppComponent {

  settings: Settings;
  groups: Group[];
  entries: Entry[];
  total: number;

  constructor(private api: ApiService) {
    api.getSettings().subscribe(settings => {
      this.settings = settings;
    });

    api.getGroups().subscribe(groups => {
      this.groups = groups;

      api.getEntries().subscribe(entries => {
        _.each(entries, (e) => {
          e.group = _.find(groups, (g) => g.id === e.groupId);
        });
        this.entries = entries;

        this.total = _.reduce(entries, (result, current: Entry) => result + current.count, 0);
      });
    });
  }
}
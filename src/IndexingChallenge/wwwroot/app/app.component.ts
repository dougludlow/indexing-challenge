import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import _ from 'lodash';

import { ApiService } from './services/api.service';
import { Settings, Group, Entry } from './models';
import { BarChartComponent } from './components/barchart.component';

@Component({
  selector: 'indexing-challenge',
  directives: [BarChartComponent],
  providers: [
    HTTP_PROVIDERS, ApiService
  ],
  template: `
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <bar-chart [settings]="settings" [groups]="groups" [entries]="entries"></bar-chart>
      </div>
    </div>
  `
})
export class AppComponent {

  settings: Settings;
  groups: Group[];
  entries: Entry[];

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
      });
    });
  }
}
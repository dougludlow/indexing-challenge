import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import 'chart.js';
import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';
import * as _ from 'lodash';
import { Settings, Group, Entry } from '../models';

@Component({
    selector: 'bar-chart',
    directives: [CHART_DIRECTIVES],
    template: `
        <h2 class="text-center">Total {{settings?.unitPlural}}</h2>
        <base-chart class="chart"
           [datasets]="barChartData"
           [labels]="barChartLabels"
           [options]="barChartOptions"
           [colors]="barChartColors"
           [legend]="barChartLegend"
           [chartType]="barChartType"></base-chart>
    `
})
export class BarChartComponent implements OnChanges {

    @Input() settings: Settings;
    @Input() groups: Group[];
    @Input() entries: Entry[];

    labelColor: string = '#ebebeb';

    barChartOptions: any = {
        responsive: true,
        scales: {
            yAxes: [{
                gridLines: { show: true, color: 'rgba(221, 221, 221, 0.25)' },
                ticks: {
                    fontColor: this.labelColor,
                    beginAtZero: true
                }
            }],
            xAxes: [{
                gridLines: { show: true, color: 'rgba(221, 221, 221, 0.25)' },
                ticks: {
                    fontColor: this.labelColor
                }
            }]
        },
        legend: {
            labels: {
                fontColor: this.labelColor
            }
        }
    };

    barChartLabels: string[] = [];
    barChartType: string = 'bar';
    barChartColors: any[] = [];
    barChartLegend: boolean = true;

    barChartData: any[] = [{ data: [0], label: 'none' }];

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        for (let prop in changes) {
            switch (prop) {
                case 'entries':
                    this.updateBarChartData();
                    break;

                case 'groups':
                    this.updateBarChartColors();
                    break;
            }
        }
    }

    updateBarChartData() {
        if (this.entries && this.entries.length)
            this.barChartData = _.chain(this.entries)
                .groupBy(e => e.group.name)
                .map((value, key) => {
                    let total = _.reduce(value, (result, current: Entry) => result + current.count, 0);
                    return { label: key, data: [total] };
                })
                .value();
    }

    updateBarChartColors() {
        this.barChartColors = _.map(this.groups, (g) => ({
            backgroundColor: g.color
        }));
    }
}
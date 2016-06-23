

import { Component, Input, SimpleChange } from '@angular/core';
import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';
import { Settings, Group, Entry } from '../models';

@Component({
    selector: 'line-chart',
    directives: [CHART_DIRECTIVES],
    template: `
        <h2 class="text-center">{{settings?.unitPlural}} Over Time</h2>
        <base-chart class="chart"
            [datasets]="lineChartData"
            [labels]="lineChartLabels"
            [options]="lineChartOptions"
            [colors]="lineChartColours"
            [legend]="lineChartLegend"
            [chartType]="lineChartType"></base-chart>
    `
})
export class LineChartComponent {

    @Input() settings: Settings;
    @Input() groups: Group[];
    @Input() entries: Entry[];

    lineChartData: any[] = [{ data: [0], label: 'none' }];
    lineChartLabels: any[] = [];
    labelColor: string = '#ebebeb';

    lineChartOptions: any = {
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
    lineChartColours: any[] = [];
    lineChartLegend: boolean = true;
    lineChartType: string = 'line';

    private months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    private diff(from, to) {
        let months = [],
            fromYear = from.getFullYear(),
            toYear = to.getFullYear(),
            diffYear = (12 * (toYear - fromYear)) + to.getMonth();

        for (let i = from.getMonth(); i <= diffYear; i++)
            months.push(this.months[i % 12]);

        return months;
    }

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
        if (this.entries && this.entries.length) {

            let dates = _.chain(this.entries)
                .sortBy(e => e.date)
                .groupBy(e => `${e.date.getMonth() + 1}/${e.date.getDate()}`)
                .keys()
                .value();

            this.lineChartLabels = dates;

            this.lineChartData = _.chain(this.entries)
                .groupBy(e => e.group.name)
                .map((value, key) => {
                    let groups: any = _.groupBy(<Entry[]>value, e => `${e.date.getMonth() + 1}/${e.date.getDate()}`);

                    _.each(dates, (d) => {
                        if (!groups[d]) groups[d] = [{ count: 0 }];
                    });

                    let data = _.chain(groups)
                        .map((v: Entry[], k) => {
                            let count = _.reduce(v, (result, current: Entry) => result + current.count, 0);
                            return { date: k, count: count };
                        })
                        .sortBy(x => x.date)
                        .map(x => x.count)
                        .value();

                    return { label: key, data: data };
                })
                .value();
        }
    }

    updateBarChartColors() {
        this.lineChartColours = _.map(this.groups, (g) => ({
            backgroundColor: g.color
        }));
    }
}


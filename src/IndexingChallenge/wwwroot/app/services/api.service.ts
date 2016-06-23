import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Settings, Group, Entry } from '../models';

@Injectable()
export class ApiService {

    constructor(private http: Http) { }

    getSettings(): Observable<Settings> {
        return this.http.get('api/settings').map(res => <Settings>res.json());
    }

    getGroups(): Observable<Group[]> {
        return this.http.get('api/groups').map(res => <Group[]>res.json());
    }

    getEntries(): Observable<Entry[]> {
        return this.http.get('api/entries')
            .map(res => <Entry[]>res.json())
            .map(entries => {
                entries.forEach((e) => {
                    e.date = new Date(<any>e.date);
                });
                return entries;
            });
    }
}
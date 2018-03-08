import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Tracker} from './tracker';
import {environment} from '../../environments/environment';


@Injectable()
export class TrackerListService {
    readonly baseUrl: string = environment.API_URL + 'trackers';
    private trackerUrl: string = this.baseUrl;

    constructor(private http: HttpClient) {
    }

    getTrackers(trackerEmoji?: string): Observable<Tracker[]> {
        this.filterByEmoji(trackerEmoji);
        return this.http.get<Tracker[]>(this.trackerUrl);
    }

    filterByEmoji(trackerEmoji?: string): void {
        if (!(trackerEmoji == null || trackerEmoji === '')) {
            if (this.parameterPresent('emoji=') ) {
                this.removeParameter('emoji=');
            }
            if (this.trackerUrl.indexOf('?') !== -1) {
                this.trackerUrl += 'emoji=' + trackerEmoji + '&';
            } else {
                this.trackerUrl += '?emoji=' + trackerEmoji + '&';
            }
        } else {
            if (this.parameterPresent('emoji=')) {
                let start = this.trackerUrl.indexOf('emoji=');
                const end = this.trackerUrl.indexOf('&', start);
                if (this.trackerUrl.substring(start - 1, start) === '?') {
                    start = start - 1;
                }
                this.trackerUrl = this.trackerUrl.substring(0, start) + this.trackerUrl.substring(end + 1);
            }
        }
    }

    private parameterPresent(searchParam: string) {
        return this.trackerUrl.indexOf(searchParam) !== -1;
    }

    private removeParameter(searchParam: string) {
        const start = this.trackerUrl.indexOf(searchParam);
        let end = 0;
        if (this.trackerUrl.indexOf('&') !== -1) {
            end = this.trackerUrl.indexOf('&', start) + 1;
        } else {
            end = this.trackerUrl.indexOf('&', start);
        }
        this.trackerUrl = this.trackerUrl.substring(0, start) + this.trackerUrl.substring(end);
    }

    addNewEmoji(newTracker: Tracker): Observable<{'$oid': string}> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };
        return this.http.post<{'$oid': string}>(this.trackerUrl + '/new', newTracker, httpOptions);
    }
}

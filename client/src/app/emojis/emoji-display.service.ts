import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Emoji} from './emoji';
import {environment} from '../../environments/environment';


@Injectable()
export class EmojiDisplayService {
    readonly baseUrl: string = environment.API_URL + 'emoji-display';
    private emojiUrl: string = this.baseUrl;


    constructor(private http: HttpClient) {
    }

    getEmojis(): Observable<{'$oid': string}> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        return this.http.get<{'$oid': string}>(this.emojiUrl + '/display', httpOptions);
    }

}

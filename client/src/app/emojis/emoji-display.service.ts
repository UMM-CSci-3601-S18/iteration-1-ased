import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Emoji} from './emoji';

@Injectable()
export class EmojiDisplayService {
    readonly baseUrl: string = environment.API_URL + 'emojis';
    private emojiUrl: string = this.baseUrl;
    filtered = false;

    constructor(private http: HttpClient) {
    }

    getEmojis(): Observable<Emoji[]> {
        this.emojiUrl = this.baseUrl + 'api/emojis';

        this.filtered = false;
        return this.http.get<Emoji[]>(this.emojiUrl);
    }
}

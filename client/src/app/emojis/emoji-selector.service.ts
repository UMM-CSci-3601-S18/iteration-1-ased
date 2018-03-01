import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Emoji} from './emoji';
import {environment} from '../../environments/environment';


@Injectable()
export class EmojiSelectorService {
    readonly baseUrl: string = environment.API_URL + 'emojis';
    private userUrl: string = this.baseUrl;

}

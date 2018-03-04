import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Emoji} from './emoji';
import {environment} from '../../environments/environment';


@Injectable()
export class EmojiSelectorService {
    readonly baseUrl: string = environment.API_URL + 'emoji-selector';
    private emojiUrl: string = this.baseUrl;


    constructor(private http: HttpClient) {
    }

    addNewEmoji(newEmoji: Emoji): Observable<{'$oid': string}> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        //Send post request to add a new to-do with the to-do data as the contents with specified headers.
        return this.http.post<{'$oid': string}>(this.emojiUrl + "/new",newEmoji, httpOptions);
    }


    //Used to determine what link to send in response to emoji
    emojiResponder(value: string): string {
        let response = '';

        //if value = sad, set response = happy link
        if (value == "happy"){
            response = "../../assets/Happy-emoji.png";
        }
        else{
            if (value == "sad"){
            response = "../../assets/Sad-emoji.png";
            }
            else{
                if (value == "angry"){
            response = "../../assets/Angry-emoji.png";
                }
                else{
                    if (value == "neutral"){
            response = "../../assets/Neutral-emoji.png";
                    }
                    else {
            response = "https://thumbs.gfycat.com/FewDearestFairybluebird-size_restricted.gif"
                    }
                }
            }
        }

        return response;
    }


}

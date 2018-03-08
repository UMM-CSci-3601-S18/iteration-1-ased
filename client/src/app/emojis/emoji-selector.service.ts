import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Emoji} from './emoji';
import {environment} from '../../environments/environment';


@Injectable()
export class EmojiSelectorService {
    readonly baseUrl: string = environment.API_URL + 'emojis';
    private emojiUrl: string = this.baseUrl;


    constructor(private http: HttpClient) {
    }

    addNewEmoji(newEmoji: Emoji): Observable<{'$oid': string}> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        console.log('The client went through addNewEmoji in emoji-selector.service');
        console.log(this.emojiUrl);

        // Send post request to add a new to-do with the to-do data as the contents with specified headers.
        return this.http.post<{'$oid': string}>(this.emojiUrl + '/new', newEmoji, httpOptions);
    }


    // Used to determine what link to send in response to emoji
    emojiResponder(value: string): string {
        let response = '';

        // if value = sad, set response = happy link
        if (value == "happy"){
            response = "https://www.youtube.com/watch?v=BfFi4wba30g&feature=youtu.be";
        }
        else{
            if (value == "sad"){
            response = "https://www.youtube.com/watch?v=EtH9Yllzjcc";
            }
            else{
                if (value == "angry"){
            response = "https://www.youtube.com/watch?v=Jyy0ra2WcQQ&feature=youtu.be";
                }
                else{
                    if (value == "neutral"){
            response = "https://www.youtube.com/watch?v=uLu6iq0NaqU";
                    }
                    else {
            response = ""
                    }
                }
            }
        }

        return response;
    }

    emojiResponder2(value: string): string {
        let response = '';

        // if value = sad, set response = happy link
        if (value == "happy"){
            response = "If It Fits, I Sits - The Supercut";
        }
        else{
            if (value == "sad"){
                response = "Try Not To Laugh Challenge - Funny Cat & Dog Vines compilation 2017";
            }
            else{
                if (value == "angry"){
                    response = "Guided Meditation - Blissful Deep Relaxation";
                }
                else{
                    if (value == "neutral"){
                        response = "This is Proven the Most Oddly Satisfying Video 2017";
                    }
                    else {
                        response = ""
                    }
                }
            }
        }

        return response;
    }

    writtenResponse(value: string): string {
        let response = '';

        //if value = sad, set response = happy link
        if (value == "happy"){
            response = "Glad to hear it!";
        }
        else{
            if (value == "sad"){
                response = "Sorry to hear that. Maybe this will cheer you up!";
            }
            else{
                if (value == "angry"){
                    response = "It's natural to get mad sometimes. " +
                        "You need to be able to let that frustration out.";
                }
                else{
                    if (value == "neutral"){
                        response = "Nice to hear.";
                    }
                    else {
                        response = "Let me know how you're feeling!"
                    }
                }
            }
        }

        return response;
    }

}

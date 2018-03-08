

import {Emoji} from "./emoji";
import {EmojiDisplayService} from "./emoji-display.service";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";

describe('Emoji display service: ', () => {
    const testEmojis: Emoji[] = [
        {
            _id: 'drew_id',
            user: 'Drew',
            value: 'angry',
            time_stamp: '12/15/2017 6:45'
        },
        {
            _id: 'paige_id',
            user: 'Paige',
            value: 'neutral',
            time_stamp: '01/24/2018 16:45'
        },
        {
            _id: 'leah_id',
            user: 'Leah',
            value: 'happy',
            time_stamp: '02/06/2018 15:34'
        }
    ];

    let emojiDisplayService: EmojiDisplayService;

    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        emojiDisplayService = new EmojiDisplayService(httpClient);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('getEmojis() calls api/emojis', () => {
        emojiDisplayService.getEmojis().subscribe(
            emojis => expect(emojis).toBe(testEmojis)
        );

        const req = httpTestingController.expectOne(emojiDisplayService.baseUrl);
        expect(req.request.method).toEqual('GET');
    });

})

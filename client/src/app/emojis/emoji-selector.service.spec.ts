

import {Emoji} from "./emoji";
import {EmojiSelectorService} from "./emoji-selector.service";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";

describe('Emoji selector service', () => {
    const testEmojis: Emoji[] = [
        {
            _id: 'frank_id',
            user: 'Frank',
            value: 'angry',
            time_stamp: '1/1/2018 1:11'
        },
        {
            _id: 'lisa_id',
            user: 'Lisa',
            value: 'sad',
            time_stamp: '9/2/2017 15:34'
        },
        {
            _id: 'paul_id',
            user: 'Paul',
            value: 'neutral',
            time_stamp: '11/11/2011 11:11'
        }
    ];

    let emojiSelectorService: EmojiSelectorService;

    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);

        emojiSelectorService = new EmojiSelectorService(httpClient);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('adding an emoji calls api/emojis/new', () => {
        const jesse_id = { '$oid': 'jesse_id' };
        const newEmoji: Emoji = {
            _id: '',
            user: 'Jesse',
            value: 'happy',
            time_stamp: '2/15/2017 7:45'
        };

        emojiSelectorService.addNewEmoji(newEmoji).subscribe(
            id => {
                expect(id).toBe(jesse_id);
            }
        );

        const expectedUrl: string = emojiSelectorService.baseUrl + '/new';
        const req = httpTestingController.expectOne(expectedUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(jesse_id);
    });

});

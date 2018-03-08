

import {EmojiDisplayComponent} from "./emoji-display.component";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {Observable} from "rxjs/Observable";
import {Emoji} from "./emoji";
import {CustomModule} from "../custom.module";
import {EmojiDisplayService} from "./emoji-display.service";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";

describe('Emoji Display', () => {
    let emojiDisplay: EmojiDisplayComponent;
    let fixture: ComponentFixture<EmojiDisplayComponent>;

    let emojiDisplayServiceStub: {
        getEmojis: () => Observable<Emoji[]>
    };

    beforeEach(() => {
        emojiDisplayServiceStub = {
            getEmojis: () => Observable.of([
                {
                    _id: 'steve_id',
                    user: 'Steve',
                    value: 'happy',
                    time_stamp: '12/14/2017 8:15'
                },
                {
                    _id: 'frank_id',
                    user: 'Frank',
                    value: 'angry',
                    time_stamp: '2/21/2018 17:15'
                },
                {
                    _id: 'nancy_id',
                    user: 'Nancy',
                    value: 'neutral',
                    time_stamp: '4/4/2016 4:36'
                }
            ])
        };

        TestBed.configureTestingModule({
            imports: [CustomModule],
            declarations: [EmojiDisplayComponent],
            providers: [{provide: EmojiDisplayService, useValue: emojiDisplayServiceStub},
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        });
    });

    beforeEach(async( () => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(EmojiDisplayComponent);
            emojiDisplay = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('contains all the emoji entries', () => {
        expect(emojiDisplay.emojis.length).toBe(3);
    });

    it('contains an emoji entry submitted by Nancy', () => {
        expect(emojiDisplay.emojis.some((emoji: Emoji) => emoji.user === 'Nancy')).toBe(true);
    });

    it('contains an emoji entry submitted by Steve', () => {
        expect(emojiDisplay.emojis.some((emoji: Emoji) => emoji.user === 'Steve')).toBe(true);
    });

    it('doesn\'t contain an emoji submitted by Lincoln', () =>{
        expect(emojiDisplay.emojis.some((emoji: Emoji) => emoji.user === 'Lincoln')).toBe(false);
    });

});

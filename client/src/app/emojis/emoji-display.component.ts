import {Component, OnInit} from '@angular/core';
import {Emoji} from './emoji';
import {EmojiDisplayService} from './emoji-display.service';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'emoji-display-component',
    templateUrl: 'emoji-display.component.html',
    styleUrls: ['./emoji-display.component.css'],
})

export class EmojiDisplayComponent implements OnInit {

    public userName: string;
    public emojiValue: string;
    public emojiDate: string;
    public emojiTime: string;
    public _id: string;

    public emojis: Emoji[];
    public filteredEmojis: Emoji[];

    public loadReady: boolean = false;

    private highlightedID: {'$oid': string} = { '$oid': ''};

    constructor(public emojiDisplayService: EmojiDisplayService, public dialog: MatDialog){

    }

    isHighlighted(emoji: Emoji): boolean {
        return emoji._id['$oid'] === this.highlightedID['$oid'];
    }

    filterEmojis(): Emoji[] {
        this.filteredEmojis = this.emojis;

        return this.filteredEmojis;
    }

    refreshEmojis(): Observable<Emoji[]> {
        let emojis: Observable<Emoji[]> = this.emojiDisplayService.getEmojis();
        emojis.subscribe(
            emojis => {
                this.emojis = emojis;
                this.filterEmojis();
        },
        err => {
                console.log(err);
        });
        return emojis;
    }

    loadService(): void {
        this.loadReady = true;
        this.emojiDisplayService.getEmojis().subscribe(
            emojis => {
                console.log('it went through here');
                this.emojis = emojis;
                this.filteredEmojis = this.emojis;
            },
            err => {
                console.log(err);
            }
        );
    }

    ngOnInit(): void {
        this.refreshEmojis();
        this.loadService();
    }
}

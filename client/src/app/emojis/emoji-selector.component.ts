import {Component, OnInit} from '@angular/core';
import {EmojiSelectorService} from './emoji-selector.service';
import {Emoji} from './emoji';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
//import {AddUserComponent} from './add-user.component';

@Component({
    selector: 'app-emoji-selector-component',
    templateUrl: 'emoji-selector.component.html',
    styleUrls: ['./emoji-selector.component.css'],
})

export class EmojiSelectorComponent implements OnInit {
    // These are public so that tests can reference them (.spec.ts)
    public emojis: Emoji[];
    public emojidoc: Emoji;

    // These are the target values used in searching.
    // We should rename them to make that clearer.
//    public userName: string;
//    public userAge: number;
//    public userCompany: string;

    public emojiVal: string;
    public emojiUser: string;
    public emojiTime: string;


    constructor(public emojiSelectorService: EmojiSelectorService, public dialog: MatDialog) {
    }

    time(){
        return Date();
    }

    submitEmoji(user: string, value: string): void {
        this.emojidoc._id = '';
        this.emojidoc.type = value;
        this.emojidoc.user = user;
        this.emojidoc.time_stamp = Date();


        this.emojiSelectorService.addNewEmoji(this.emojidoc);
    }

    ngOnInit(): void {

    }
}

import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EmojiSelectorService} from './emoji-selector.service';
import {Emoji} from './emoji';
import {Observable} from 'rxjs/Observable';
//import {AddUserComponent} from './add-user.component';

@Component({
    selector: 'app-emoji-display-component',
    templateUrl: 'emoji-display.component.html',
    styleUrls: ['./emoji-display.component.css'],
})

export class EmojiDisplayComponent implements OnInit {

    public Emojis: Emoji[];
    public emojiDoc: Emoji;

    constructor(public emojiDisplayService: EmojiSelectorService, public dialog: MatDialog) {
    }






    ngOnInit(): void {
};

}

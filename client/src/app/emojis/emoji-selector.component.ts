import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EmojiSelectorService} from './emoji-selector.service';
import {Emoji} from './emoji';
import {Observable} from 'rxjs/Observable';
//import {AddUserComponent} from './add-user.component';

@Component({
    selector: 'app-emoji-selector-component',
    templateUrl: 'emoji-selector.component.html',
    styleUrls: ['./emoji-selector.component.css'],
})

export class EmojiSelectorComponent implements OnInit {
    // These are public so that tests can reference them (.spec.ts)
    public emojis: Emoji[];


    // These are the target values used in searching.
    // We should rename them to make that clearer.
//    public userName: string;
//    public userAge: number;
//    public userCompany: string;

    public emojiVal: string;
    public emojiUser: string;


    constructor(public emojiSelectorService: EmojiSelectorService, public dialog: MatDialog) {
    }

    time(){
        return Date();
    }



    openDialog(): void {
        let value = this.emojiVal;
        var emojidoc: Emoji = {
            _id: '',
            user: '',
            value: '',
            time_stamp: '',
        };

        emojidoc._id = '';
        emojidoc.value = value;
        emojidoc.user = this.emojiUser;
        emojidoc.time_stamp = Date();

        this.emojiSelectorService.addNewEmoji(emojidoc);

        let dialogRef = this.dialog.open(EmojiSelectorResponseDialog, {
            width: '75vw',
            data: { name: this.emojiUser,
                writtenResponse: this.emojiSelectorService.writtenResponse(value),
                mediaResponse: this.emojiSelectorService.emojiResponder(value)}
        });

    }

    emojiResponse(value: string): string{
        return this.emojiSelectorService.emojiResponder(value);
    }


    ngOnInit(): void {

    }
}

@Component({
    selector: 'emoji-selector-response',
    templateUrl: 'emoji-selector-response.html',
})
export class EmojiSelectorResponseDialog {

    constructor(
        public dialogRef: MatDialogRef<EmojiSelectorResponseDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

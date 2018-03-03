import {Component, OnInit} from '@angular/core';
import {EmojiSelectorService} from './emoji-selector.service';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-emoji-selector-component',
    templateUrl: 'emoji-selector.component.html',
    styleUrls: ['./emoji-selector.component.css'],
})

export class EmojiSelectorComponent implements OnInit {
    // These are public so that tests can reference them (.spec.ts)
//    public users: User[];
//    public filteredUsers: User[];

    // These are the target values used in searching.
    // We should rename them to make that clearer.
//    public userName: string;
//    public userAge: number;
//    public userCompany: string;

    submitEmoji(): void {

    }

    ngOnInit(): void {

    }
}

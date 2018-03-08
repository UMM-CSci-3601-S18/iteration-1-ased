import {Component} from '@angular/core';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent {
    public text: string;

    constructor() {
        this.text = 'Emoji Journal - Iteration I';
    }
}

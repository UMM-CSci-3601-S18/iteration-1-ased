import {Component} from '@angular/core';

@Component({
    templateUrl: 'resources.component.html'
})
export class ResourcesComponent {
    public text: string;

    constructor() {
        this.text = 'Resources';
    }
}

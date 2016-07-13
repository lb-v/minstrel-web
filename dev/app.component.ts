import {Component} from '@angular/core';
import {SearchComponent} from './search.component';

import './rxjs-operators';

@Component({
    selector: 'my-app',
    templateUrl: 'html/app.component.html',
    directives: [
        SearchComponent
    ]
})
export class AppComponent {

}

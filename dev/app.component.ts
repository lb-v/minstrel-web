import {Component} from '@angular/core';
import {ShoppingListComponent} from './shopping-list.component';
import {SearchComponent} from './search.component';

@Component({
    selector: 'my-app',
    templateUrl: 'html/app.component.html',
    directives: [
        ShoppingListComponent, 
        SearchComponent
    ]
})
export class AppComponent {

}

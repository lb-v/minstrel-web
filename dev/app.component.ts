import {Component} from '@angular/core';
import {ShoppingListComponent} from './shopping-list.component';

@Component({
    selector: 'my-app',
    template: `
        <h1>Angular 2 Boilerplate</h1>
        <p>Hello World!</p>
        <shopping-list></shopping-list>
    `,
    directives:[ShoppingListComponent]
})
export class AppComponent {

}

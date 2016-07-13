import {Component} from "@angular/core"

@Component({
  selector: 'shopping-list',
  template: `
    This is the shopping list<br/>
      <ul>
        <li *ngFor='#shoppingListItem of shoppingListItems'
            (click)='onItemClicked(shoppingListItem)'
        >{{shoppingListItem.name}}</li>
      </ul>
      
      <input type='text' [(ngModel)]='selectedItem.name' #shoppingListItem>
      <br/>
      <button (click)="onDeleteItem()">Delete Item</button>
      <button (click)="onAddItem(shoppingListItem)">Add Item</button>
  `
})
export class ShoppingListComponent {
  public shoppingListItems = [
    {name:'Milk'},
    {name:'Bread'},
    {name:'Sugar'},
  ];
  public selectedItem = {name:""};

  constructor() { }

  onItemClicked(shoppingListItem){
    this.selectedItem = shoppingListItem;
  }

  onAddItem(shoppingListItem){
    this.shoppingListItems.push({name:shoppingListItem.value})
  }
  onDeleteItem(){
    this.shoppingListItems.splice(this.shoppingListItems.indexOf(this.selectedItem),1);
  }
}

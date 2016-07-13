import { ShoppingListComponent } from './shopping-list.component';

describe('Shopping list', () => {
  let list: ShoppingListComponent;
  beforeEach(() => {
    list = new ShoppingListComponent();
  });
  it('has name', () => {
    expect(list.shoppingListItems[0].name).toEqual("Milk");
  });
});
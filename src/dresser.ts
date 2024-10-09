type Socks = { style: string; color: string }
type Shirt = { style: string; size: string; }
type Pants = { waist: number; length: number; }

type Clothes = Socks | Shirt | Pants;

class Drawer<C extends Clothes> {
  private clothes: C[] = [];

  /** @returns true if the drawer is empty and false otherwise */
  public isEmpty(): boolean {
    return this.clothes.length == 0;
  }

  /** adds an item to the drawer on top of any other items already in the drawer */
  public addItem(item: C): void {
    this.clothes.push(item);
  }

  /** removes and returns the top item in the drawer, or returns undefined if the drawer is empty */
  public removeItem(): C | undefined {
    return this.clothes.pop();
  }

  /** removes and returns all items in the drawer as an array */
  public removeAll() {
    const items = [...this.clothes];
    this.clothes.length = 0;
    return items;
  }

}

class Dresser<
  C1 extends Clothes,
  C2 extends Clothes,
  C3 extends Clothes,
> {
  top = new Drawer<C1>();
  middle = new Drawer<C2>();
  bottom = new Drawer<C3>();
}

function testDresser() {
  const dresser = new Dresser<Socks, Shirt, Pants>();

  // Top dresser
  dresser.top.addItem({style: "long", color:"black"});
  dresser.top.addItem({style: "long", color:"white"});
  dresser.top.addItem({style: "short", color:"white"});
  dresser.top.isEmpty(); // assert: False

  // Middle dresser
  dresser.middle.isEmpty(); // assert: True
  dresser.middle.addItem({style: "shorts", size: "L"});
  dresser.middle.addItem({style: "graphic", size: "L"});
  dresser.middle.addItem({style: "sweater", size: "slim"});
  dresser.middle.removeItem(); // assert: {style: "sweater", size: "slim"}
  dresser.middle.removeItem(); // assert: {style: "graphic", size: "L"}

  // Bottom dresser
  dresser.bottom.removeAll(); // assert: []
  dresser.bottom.addItem({waist: 30, length: 32});
  dresser.bottom.addItem({waist: 31.5, length: 32});
  // @ts-expect-error
  dresser.bottom.addItem({style: "long", color:"white"}); // INVALID: Compile error
  dresser.bottom.removeAll(); // Assert: length(2)
  dresser.bottom.isEmpty(); // Assert: true

}

testDresser();

export class Color {
  constructor(
    public red = 0,
    public green = 0,
    public blue = 0,
  ) { }
}

export class Image {
  private pixels: Color[][];

  constructor(width: number, height: number) {
    this.pixels = [...Array(width)].map(() => [...Array(height)].map(() => new Color()));
  }

  getWidth() {
    return this.pixels.length;
  }
  getHeight() {
    return this.pixels[0].length;
  }

  set(x: number, y: number, color: Color) {
    this.pixels[x][y] = color;
  }

  get(x: number, y: number) {
    return this.pixels[x][y];
  }
}

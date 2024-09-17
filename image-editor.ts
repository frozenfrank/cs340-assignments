import { Color, Image } from "./image";
import { getReader, write } from "./files";

export default class ImageEditor {

  run(args: string[]) {
    try {
      if (args.length < 3) {
        this.usage();
        return;
      }

      const [inputFile, outputFile, filter] = args;
      const image = this.read(inputFile);

      switch (filter) {
        case 'greyscale':
        case 'grayscale':
          this.assertUsage(3, args);
          this.grayscale(image);
          break;
        case 'invert':
          this.assertUsage(3, args);
          this.invert(image);
          break;
        case 'emboss':
          this.assertUsage(3, args);
          this.emboss(image);
          break;
        case 'motionblur':
          this.assertUsage(4, args);
          const blurLength = parseInt(args[3]);
          if (isNaN(blurLength) || blurLength < 0) {
            this.usage();
            return;
          }

          this.motionBlur(image, blurLength);
          break;
        default:
          this.usage();
          return;
      }

      this.write(image, outputFile);
    } catch (error) {
      console.error(error);
    }
  }

  private assertUsage(exactArgs: number, args: string[]): void|never {
    if (args.length !== exactArgs) {
      this.usage();
      throw new Error('Invalid number of arguments');
    }
  }

  private usage() {
    console.log('Usage: image-editor <input-file> <output-file> <grayscale|invert|emboss|motionblur> {motion-blur-length}');
  }

  private motionBlur(image: Image, length: number) {
    if (length < 1) {
      return;
    }

    for (let x = 0; x < image.getWidth(); ++x) {
      for (let y = 0; y < image.getHeight(); ++y) {
        const curColor = image.get(x, y);

        const maxX = Math.min(image.getWidth() - 1, x + length - 1);
        let tempColor: Color;
        for (let i = x + 1; x <= maxX; ++i) {
          tempColor = image.get(i, y);
          curColor.red += tempColor.red;
          curColor.green += tempColor.green;
          curColor.blue += tempColor.blue;
        }

        const delta = maxX - x + 1;
        curColor.red = Math.floor(curColor.red / delta);
        curColor.green = Math.floor(curColor.green / delta);
        curColor.blue = Math.floor(curColor.blue / delta);
      }
    }
  }

  private invert(image: Image) {
    let curColor: Color;
    for (let x = 0; x < image.getWidth(); ++x) {
      for (let y = 0; y < image.getHeight(); ++y) {
        curColor = image.get(x, y);

        curColor.red = 255 - curColor.red;
        curColor.green = 255 - curColor.green;
        curColor.blue = 255 - curColor.blue;
      }
    }
  }

  private grayscale(image: Image) {
    let curColor: Color;
    let grayLevel: number;
    for (let x = 0; x < image.getWidth(); ++x) {
      for (let y = 0; y < image.getHeight(); ++y) {
        curColor = image.get(x, y);

        grayLevel = Math.floor((curColor.red + curColor.green + curColor.blue) / 3);
        grayLevel = Math.max(0, Math.min(grayLevel, 255));

        curColor.red = grayLevel;
        curColor.green = grayLevel;
        curColor.blue = grayLevel;
      }
    }
  }

  private emboss(image: Image) {
    let curColor: Color, upLeftColor: Color;
    let grayLevel: number;
    let diff: number;
    for (let x = 0; x < image.getWidth(); ++x) {
      for (let y = 0; y < image.getHeight(); ++y) {
        curColor = image.get(x, y);

				diff = 0;
				if (x > 0 && y > 0) {
					upLeftColor = image.get(x - 1, y - 1);
					if (Math.abs(curColor.red - upLeftColor.red) > Math.abs(diff)) {
						diff = curColor.red - upLeftColor.red;
					}
					if (Math.abs(curColor.green - upLeftColor.green) > Math.abs(diff)) {
						diff = curColor.green - upLeftColor.green;
					}
					if (Math.abs(curColor.blue - upLeftColor.blue) > Math.abs(diff)) {
						diff = curColor.blue - upLeftColor.blue;
					}
				}

        grayLevel = Math.floor((curColor.red + curColor.green + curColor.blue) / 3);
        grayLevel = Math.max(0, Math.min(grayLevel, 255));

        curColor.red = grayLevel;
        curColor.green = grayLevel;
        curColor.blue = grayLevel;
      }
    }
  }

  private read(inputFile: string): Image {
    const imageReader = getReader(inputFile);

    imageReader.next(); // Skip P3
    const width = imageReader.nextInt();
    const height = imageReader.nextInt();

    const image = new Image(width, height);

    imageReader.next(); // Skip max color value

    let color: Color;
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        color = new Color();
        color.red = imageReader.nextInt();
        color.green = imageReader.nextInt();
        color.blue = imageReader.nextInt();
        image.set(x, y, color);
      }
    }

    return image;
  }

  private write(image: Image, outputFile: string): void {
    try {
      const out = [];
      out.push("P3\n");
      out.push(image.getWidth() + " " + image.getHeight() + "\n");
      out.push("255\n");

      let color: Color;
			for (let y = 0; y < image.getHeight(); ++y) {
				for (let x = 0; x < image.getWidth(); ++x) {
					color = image.get(x, y);
					out.push(`${x == 0 ? "" : " "} ${color.red} ${color.green} ${color.blue}`);
				}
				out.push("\n");
			}

      write(outputFile, out.join(""));
    } catch (error) {
      console.error(`Error writing image to file: ` + error);
    }
  }
}
import ImageEditor from "./image-editor";

const [_1, _2, ...args] = process.argv;
new ImageEditor().run(args);

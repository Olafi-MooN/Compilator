import { IInputStreamModel } from "../Interfaces/IInputStreamModel";

const InputStream: IInputStreamModel = (txt: string) => {
  var pos = 0, line = 1, col = 0;

  function next() {
    var ch = txt.charAt(pos++);
    if (ch == "\n") line++, col = 0; else col++;
    return ch;
  }

  function previous() {
    var ch = txt.charAt(pos--);
    if (ch == "\n") line--, col = 0; else col--;
    return ch;
  }

  function peek() {
    return { char: txt.charAt(pos), pointers: pointers() };
  }

  function eof() {
    return peek().char == "";
  }

  function pointers() {
    return { pos, line, col };
  }

  return { next, peek, eof, previous, pointers };
}

export { InputStream }
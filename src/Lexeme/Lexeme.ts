import { ITokenFunctionModel, ITokenModel } from "../Interfaces/ITokenModel";
import { InputStream } from "../ReadFile/InputStream";
import { dictionary } from "../Token/Dictionary";
import { ETipoToken } from "../Token/TipoToken";
import { Token } from "../Token/Token";

function Lexer(file: string) {
  let is = InputStream(file);
  let KW: typeof ETipoToken = ETipoToken;

  function lexError(message: string): void {
    throw new Error(message);
  }

  function previousPointer() {
    is.previous();
  }

  function nextToken() {
    var state = 1;
    var lexeme = '';
    var c = null;

    if(is.eof()) { 
      return null;
    }
    while (true) {
      c = is.next();

      if (state === 1) {
        if (c === '') {
          return Token(KW.EOF, "EOF", is.pointers().line, is.pointers().col)
        }
        else if (c === ' ' || c === '\t' || c === '\n' || c === '\r') {
          state = 1;
        }
        else if (c === '"') {
          state = 2;
          lexeme += c;
         }
        else if (c === ":") { 
          lexeme += c;
          state = 3;
        }
        else if (c === ";") { 
          return Token(KW.SMB_POINT_SEMICOLON, ";", is.pointers().line, is.pointers().col)
        } else if (isOperators(c)) {
          lexeme += c;
          state = 4;
        }
        else if (!isNaN(+c)) {
          lexeme += c
          state = 5
        }
        else if (isAlpha(c)) {
          lexeme += c
          state = 3;
        }
        else {
          lexError("Caractere invalido [" + c + "] na linha " + is.pointers().line + " e coluna " + is.pointers().col)
          return null
        } 
      }

      else if (state === 2) {
        is.previous();
        lexeme += is.peek().char;
        while( is.peek().char !== '"') {
          if(is.peek().char === "\r") {
            lexError("<< lexical error >> Literal does not allow line wrapping -> Line: " + is.pointers().line + ", column: " + is.pointers().col);
            return null
          } 
          is.next();
          lexeme += is.peek().char;
        }
        is.next();
        return Token(ETipoToken.LITERALS, `${lexeme}`, is.pointers().line, is.pointers().col)
      }

      else if (state === 5) {
        if (!isNaN(+c)) {
          lexeme += c
        }
        else {
          previousPointer();
          if(lexeme.replaceAll(/\s/g, "") !== '') {
            return Token(ETipoToken.NUM, lexeme.replaceAll(/\s/g, ""), is.pointers().line, is.pointers().col)
          }
          state = 1;
        }
      }

      else if (state === 3) {
         if(isAlphaNumeric(c)) { 
            lexeme += c
         }
         else { 
           previousPointer();
           var token: ITokenModel = dictionary.get(lexeme.replaceAll(/\s/g, ""));
           if(token) { 
             return Token(token.name, token.lexema, is.pointers().line, is.pointers().col);
           }
           return Token(ETipoToken.ID, lexeme, is.pointers().line, is.pointers().col)
         }
      }
      
      else if (state === 4) {
         if(lexeme === "+") return Token(ETipoToken.OP_SUM, lexeme, is.pointers().line, is.pointers().col);
         if(lexeme === "-") return Token(ETipoToken.OP_SUBTRACTION, lexeme, is.pointers().line, is.pointers().col);
         if(lexeme === "/") return Token(ETipoToken.OP_DIVISION, lexeme, is.pointers().line, is.pointers().col);
         if(lexeme === "*") return Token(ETipoToken.OP_MULTIPLICATION, lexeme, is.pointers().line, is.pointers().col);
      }
    }
  }

  return { lexError, nextToken };
}

const isAlpha: (c: string) => boolean = c => /^[a-zA-Z]*$/.test(c);
const isAlphaNumeric: (c: string) => boolean = c => /^[a-zA-Z0-9]+$/gi.test(c);
const isOperators: (c: string) => boolean = c => c === "+" || c === "-" || c === "/" || c === "*";

export { Lexer }
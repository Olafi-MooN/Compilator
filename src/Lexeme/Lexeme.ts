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
    var breakWhile = true;

    while (breakWhile) {
      let c = is.next();

      if (state === 1) {
        if (c === '') {
          breakWhile = false;
          return Token(KW.EOF, "EOF", is.pointers().line, is.pointers().col)
        }
        else if (c === ' ' || c === '\t' || c === '\n' || c === '\r') {
          state = 1
        }
        else if (c === '"') {
          state = 2
        }
        else if (c === ":") { 
          lexeme += c
          state = 7;
        }
        else if (c === ";") { 
          return Token(KW.SMB_POINT_SEMICOLON, ";", is.pointers().line, is.pointers().col)
        }
        else if (!isNaN(+c)) {
          lexeme += c
          state = 6
        }
        else if (isAlpha(c)) {
          lexeme += c
          state = 7
        }
        else {
          lexError("Caractere invalido [" + c + "] na linha " + is.pointers().line + " e coluna " + is.pointers().col)
          return null
        } 
      }

      else if (state === 2) {
        is.previous();
        while( is.peek().char !== '"') { 
          lexeme += is.peek().char;
          is.next();
        }
        is.next();
        return Token(ETipoToken.LITERALS, `${lexeme}`, is.pointers().line, is.pointers().col)
      }

      else if (state === 6) {
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

      else if (state === 7) {
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
    }
  }

  return { lexError, nextToken };
}

const isAlpha = str => /^[a-zA-Z]*$/.test(str);
const isAlphaNumeric = str => /^[a-zA-Z0-9]+$/gi.test(str);

export { Lexer }
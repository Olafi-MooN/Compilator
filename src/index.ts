import { Lexer } from "./Lexeme/Lexeme";
import { InputStream } from "./ReadFile/InputStream";
import { ReadFile } from "./ReadFile/ReadFile";
import { ETipoToken } from "./Token/TipoToken";
import { Token } from "./Token/Token";

(async () => {
  var language = (await ReadFile('alguma.txt')).toString();
  const lexer = Lexer(language);

  var token = lexer.nextToken();

  while (token !== null && token.name !== ETipoToken.EOF) {
    console.log(token.lexema);
    token = lexer.nextToken();
  }
  console.log(token.lexema);
}
)()

import { ITokenModel } from "./Interfaces/ITokenModel";
import { Lexer } from "./Lexeme/Lexeme";
import { InputStream } from "./ReadFile/InputStream";
import { ReadFile } from "./ReadFile/ReadFile";
import { ETipoToken } from "./Token/TipoToken";
import { Token } from "./Token/Token";

(async () => {
  var language = (await ReadFile('alguma.txt')).toString();
  const lexer = Lexer(language);
  var token: ITokenModel = new Object() as ITokenModel;

  while (token !== null) {
    token = lexer.nextToken();
    if(token !== null) { 
      console.log(token);
    }
  }

}
)()

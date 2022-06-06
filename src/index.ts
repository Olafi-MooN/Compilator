import { ITokenModel } from "./Interfaces/ITokenModel";
import { Lexer } from "./Lexeme/Lexeme";
import { ReadFile } from "./ReadFile/ReadFile";

(async () => {
  var language = (await ReadFile('alguma.txt')).toString();
  const lexer = Lexer(language);
  var token: ITokenModel = new Object() as ITokenModel;

  while (token !== null) {
    token = lexer.nextToken();
    if(token !== null) { 
      console.log(token.token);
    }
  }
})()

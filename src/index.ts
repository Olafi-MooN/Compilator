import { ITokenModel } from "./Interfaces/ITokenModel";
import { Lexer } from "./Lexeme/Lexeme";
import { ReadFile } from "./ReadFile/ReadFile";
import { Syntactic } from "./Syntactic";

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
  
  console.log("\n\nsymbols\n\n")
  lexer.symbols.forEach(smb => console.log(`< ${smb.name} , ${smb.lexema}>`));

  console.log('\n\n\n\n\n\n');
})();

(async () => {
  var language = (await ReadFile('alguma.txt')).toString();
  const lexer = Lexer(language);
  const syntactic = Syntactic(lexer);

  syntactic.program();
  
  console.log("\n\ntable of symbols\n\n")
  lexer.symbols.forEach(smb => console.log(`< ${smb.name} , ${smb.lexema}>`));

})()

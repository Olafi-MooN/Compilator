import { ITokenModel } from "../Interfaces/ITokenModel";
import { symbols } from "../Token/Symbols";

const Semantics = () => {
  
  const validateId = (token: ITokenModel) => { 
    if(symbols.get(token.lexema)?.type !== typeof Number()) {
      throw new Error(`\u001b[31m Semantics Erro in line: ${token.line}, column: ${token.column} the variable ${token.lexema} is not define.`);
    }
  }

  const updateIdSymbolToken = (token: ITokenModel) => {
    token.type = typeof Number();
    symbols.set(token.lexema, token) 
  }

  return { 
    validateId,
    updateIdSymbolToken
  }
} 


export { Semantics };
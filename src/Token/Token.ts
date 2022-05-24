import { ITokenFunctionModel, ITokenModel } from "../Interfaces/ITokenModel";

const Token: ITokenFunctionModel = (name, lexema, line, column) => { 
  return { name, lexema, line, column, token: `< ${name}, '${lexema}' -> ${line}, ${column} >` };
};

export { Token };
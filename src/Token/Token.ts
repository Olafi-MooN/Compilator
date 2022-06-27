import { ITokenFunctionModel, ITokenModel } from "../Interfaces/ITokenModel";

const Token: ITokenFunctionModel = (name, lexema, line, column, type) => { 
  return { name, lexema, line, column, type, token: `< ${name}, '${lexema}' -> ${line}, ${column} >` };
};

export { Token };
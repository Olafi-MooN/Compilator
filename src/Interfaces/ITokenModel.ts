import { ETipoToken } from "../Token/TipoToken";

interface ITokenModel {
  name: ETipoToken,
  lexema: string,
  line?: number,
  column?: number,
  token: string
}

interface ITokenFunctionModel {
  (name: ETipoToken, lexema: string, line?: number, column?: number): ITokenModel;
}

export { ITokenFunctionModel, ITokenModel }
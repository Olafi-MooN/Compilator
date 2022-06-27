import { ETipoToken } from "../Token/TipoToken";

interface ITokenModel {
  name: ETipoToken,
  lexema: string,
  line?: number,
  column?: number,
  token: string,
  type: string,
}

interface ITokenFunctionModel {
  (name: ETipoToken, lexema: string, line?: number, column?: number, type?: string): ITokenModel;
}

export { ITokenFunctionModel, ITokenModel }
import { ITokenModel } from "./ITokenModel";

interface ILexerModel { 
  lexError?: (message: string) => void;
  panicModeManger?: (message: string) => void;
  previousPointer?: () => void;
  nextToken: () => null | ITokenModel;
  symbols: Map<string, ITokenModel>;
}

export { ILexerModel }
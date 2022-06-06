import { ITokenModel } from "../Interfaces/ITokenModel";
import { ETipoToken } from "./TipoToken";
import { Token } from "./Token";

// Class for symbol table by { key: : 'value'}
var symbols = new Map<string, ITokenModel>();

symbols.set("if", Token(ETipoToken.KW_IF, 'if'));
symbols.set("print", Token(ETipoToken.KW_PRINT, 'print'));
symbols.set("program", Token(ETipoToken.AJM_SOF, 'program'));
symbols.set("begin", Token(ETipoToken.KW_BEGIN, 'begin'));
symbols.set("end", Token(ETipoToken.KW_END, 'end'));
symbols.set("print", Token(ETipoToken.KW_PRINT, 'print'));
symbols.set("forward", Token(ETipoToken.KW_FORWARD, 'forward'));
symbols.set("repeat", Token(ETipoToken.KW_REPEAT, 'repeat'));
symbols.set("do", Token(ETipoToken.KW_DO, 'do'));
symbols.set("turn", Token(ETipoToken.KW_TURN, 'turn'));
symbols.set("degrees", Token(ETipoToken.KW_DEGREES, 'degrees'));

export { symbols }
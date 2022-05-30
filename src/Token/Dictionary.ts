import { ETipoToken } from "./TipoToken";
import { Token } from "./Token";

// Classe para a tabela de simbolos representada por um dicionario: {'chave' : 'valor'}
var dictionary = new Map();

dictionary.set("if", Token(ETipoToken.KW_IF, 'if'));
dictionary.set("print", Token(ETipoToken.KW_PRINT, 'print'));
dictionary.set("program", Token(ETipoToken.AJM_SOF, 'program'));
dictionary.set("begin", Token(ETipoToken.KW_BEGIN, 'begin'));
dictionary.set("end", Token(ETipoToken.KW_END, 'end'));
dictionary.set("print", Token(ETipoToken.KW_PRINT, 'print'));
dictionary.set("forward", Token(ETipoToken.KW_FORWARD, 'forward'));
dictionary.set("repeat", Token(ETipoToken.KW_REPEAT, 'repeat'));
dictionary.set("do", Token(ETipoToken.KW_DO, 'do'));
dictionary.set("turn", Token(ETipoToken.KW_TURN, 'turn'));
dictionary.set("degrees", Token(ETipoToken.KW_DEGREES, 'degrees'));

export { dictionary }
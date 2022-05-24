import { ETipoToken } from "./TipoToken";
import { Token } from "./Token";

// Classe para a tabela de simbolos representada por um dicionario: {'chave' : 'valor'}
var dictionary = new Map();

dictionary.set("if", Token(ETipoToken.KW_IF, 'if'));
dictionary.set("else", Token(ETipoToken.KW_ELSE, 'else'));
dictionary.set("then", Token(ETipoToken.KW_THEN, 'then'));
dictionary.set("print", Token(ETipoToken.KW_PRINT, 'print'));

export { dictionary }
import { exit } from "process";
import { ILexerModel } from "../Interfaces/ILexerModel"
import { ITokenModel } from "../Interfaces/ITokenModel";
import { ETipoToken as Tag } from "../Token/TipoToken";

const Syntactic = (lexer: ILexerModel) => {

  const lexeme: ILexerModel = lexer;
  // Mandatory initial reading of the first symbol
  var token: ITokenModel = lexeme.nextToken();
  if (token === null) {
    exit(0);
  }

  function syntacticError(message: string) {
    throw new Error("\u001b[31m" + `\n\n << Syntactic Erro >> in line ${token.line} and column ${token.column}\n ${message}\n`);
  }

  function syntacticNextToken() {
    console.log("[DEBUG] token: " + token.token);
    token = lexer.nextToken();
    if (token === null) {
      exit(0);
    }
  }

  function expectationToken(tokenName: string) {
    if (token.name === tokenName) {
      syntacticNextToken();
      return true;
    } else {
      return false;
    }
  }

  function program() {
    cmd();
    if (token.name !== Tag.EOF) {
      syntacticError(`Expected ${Tag.EOF} but it was found " ${token.name}`);
    }
  }

  function cmd() {
    if (expectationToken(Tag.AJM_SOF)) {
      if (expectationToken(Tag.LITERALS)) {
        decl();
      } else syntacticError(`Expected ${Tag.LITERALS} but it was found -> "${token.name}"`);
    } else syntacticError(`Expected ${Tag.AJM_SOF}, but it was found -> "${token.name}"`);

    function decl() {
      if (expectationToken(Tag.SMB_TWO_POINTS)) {
        if (expectationToken(Tag.ID)) {
          if (!expectationToken(Tag.SMB_POINT_SEMICOLON)) {
            syntacticError(`Expected ${Tag.SMB_TWO_POINTS}, but it was found -> "${token.name}"`);
          }
          decl();
        } else syntacticError(`Expected ${Tag.ID}, but it was found -> "${token.name}"`);
      }
      block()
    }

    // Block → ‘begin’ StatementList ‘end’
    function block() {
      if (expectationToken(Tag.KW_BEGIN)) {
        statementList();
        if(!expectationToken(Tag.KW_END) ) { 
          syntacticError(`Expected ${Tag.KW_END}, but it was found -> "${token.name}"`);
        }
      } else {
        syntacticError(`Expected ${Tag.KW_BEGIN}, but it was found -> "${token.name}"`);
      }
    }

    function statementList() {
      // StatementList → Statement StatementList’
      statement();
      statementListLine();
    }

    function statement() {
      // ‘turn’ Term ‘degrees’
      if (expectationToken(Tag.KW_TURN)) {
        term();
        if (!expectationToken(Tag.KW_DEGREES)) syntacticError(`Expected ${Tag.KW_DEGREES}, but it was found -> "${token.name}"`);
        statement();
      }

      // ‘forward’ Term
      else if (expectationToken(Tag.KW_FORWARD)) {
        term();
        statement();
      }

      // ‘repeat’ Term ‘do’ Block
      else if (expectationToken(Tag.KW_REPEAT)) {
        term();
        if (expectationToken(Tag.KW_DO)) {
          block();
          statement();
        } else syntacticError(`Expected ${Tag.KW_DO}, but it was found -> "${token.name}"`);
      }

      // ‘print’ literal
      else if (expectationToken(Tag.KW_PRINT)) {
        if (!expectationToken(Tag.LITERALS)) syntacticError(`Expected ${Tag.LITERALS}, but it was found -> "${token.name}"`);
        statement();
      }

      // AssignmentStatement
      // ‘:’id Expr
      else if (expectationToken(Tag.SMB_TWO_POINTS)) {
        if (!expectationToken(Tag.ID)) syntacticError(`Expected ${Tag.ID}, but it was found -> "${token.name} "`);
        expression();
        statement();
      }
      
      // IfStatement
      else if (expectationToken(Tag.KW_IF)) {
        while(token.name === Tag.NUM || token.name === Tag.OP_DIVISION || token.name === Tag.OP_SUBTRACTION|| token.name === Tag.OP_MULTIPLICATION|| token.name === Tag.OP_SUM ) { 
          expression();
        }
        if(expectationToken(Tag.KW_DO)) {
          block();
          statement();
        } 
      }
    }

    // ‘;’ StatementList | ε
    function statementListLine() {
      if (expectationToken(Tag.SMB_POINT_SEMICOLON)) {
        statementList();
      }
    }

    // Expr → Expr1 Expr’
    function expression() {
      expression1();
      expressionLine();
    }

    // Expr1 → Expr2 Expr1’
    function expression1() {
      expression2();
      expression1Line();
    }

    // ‘+’ Expr1 Expr’ | ‘-’ Expr1 Expr’ | ε
    function expressionLine() {
      if (expectationToken(Tag.OP_SUM) || expectationToken(Tag.OP_SUBTRACTION)) {
        expression1();
        expressionLine();
      }
    }

    // Expr1’ → ‘*’ Expr2 Expr1’ | ‘/’ Expr2 Expr1’ | ε
    function expression1Line() {
      if (expectationToken(Tag.OP_MULTIPLICATION) || expectationToken(Tag.OP_DIVISION)) {
        expression2();
        expression1Line();
      }
    }

    // Expr2 → Term
    function expression2() {
      term();
    }

    // Term → number | ‘:’id
    function term() {
      if (expectationToken(Tag.SMB_TWO_POINTS)) {
        if (!expectationToken(Tag.ID)) {
          syntacticError(`Expected ":ID", but it was found -> "${token.name} "`);
        }
      } else {
        if (!expectationToken(Tag.NUM)) {
          syntacticError(`Expected "NUM", but it was found -> "${token.name} "`);
        }
      }
    }
  }

  return { program }

}

export { Syntactic }
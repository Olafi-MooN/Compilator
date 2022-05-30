enum ETipoToken {
  // # Start file
  AJM_SOF = 'AJM_SOF',
  
  // # End of file
  EOF = 'EOF',

  //  # Keywords
  KW_BEGIN = 'KW_BEGIN',
  KW_END = 'KW_END',
  KW_PRINT = 'KW_PRINT',
  KW_FORWARD = 'KW_FORWARD',
  KW_IF = 'KW_IF',
  KW_REPEAT = 'KW_REPEAT',
  KW_DO = 'KW_DO',
  KW_TURN = 'KW_TURN',
  KW_DEGREES = 'KW_DEGREES',

  //  # Operations 
  OP_SUM = 'OR_SUM',
  OP_SUBTRACTION = 'OP_SUBTRACTION',
  OP_MULTIPLICATION = 'OP_MULTIPLICATION',
  OP_DIVISION = 'OP_DIVISION',

  //  # Symbols
  SMB_TWO_POINTS = 'SMB_TWO_POINTS',
  SMB_POINT_SEMICOLON = 'SMB_POINT_SEMICOLON',

  //  # Identificador
  ID = 'ID',

  //  # Numbers
  NUM = 'NUM',

  // # Commented
  COMMENTS = 'COMMENTS',

  // # Literals
  LITERALS = 'LITERALS'
}


export { ETipoToken };
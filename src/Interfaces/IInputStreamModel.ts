interface IInputStreamModel { 
  (txt: string): IInputStreamReturnModel;
}

interface IInputStreamReturnModel { 
  next: () => string;
  previous: () => string;
  peek: () => IPeekReturnModel;
  eof: () => boolean;
  pointers: () => IInputStreamPointerModel;
}

interface IPeekReturnModel { 
  char: string,
  pointers: IInputStreamPointerModel
}

interface IInputStreamPointerModel{ 
  pos: number;
  line: number;
  col: number;
}

export { IInputStreamModel }
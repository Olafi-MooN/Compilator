import { createReadStream } from "node:fs";
import { IReadFileModel } from "../Interfaces/IReadFileModel";

const ReadFile: IReadFileModel = (nameFile) => { 
  var readStream = createReadStream(__dirname + '/../language/'+nameFile);
  
  return new Promise<string>((resolve, reject) => {
    readStream
      .on('data', (chunk: string) => resolve(chunk))
        .on('error', (err) => reject('Ocorreu um erro ao tentar ler o arquivo, '+err));
  })
}

export { ReadFile }
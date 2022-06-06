export interface IReadFileModel {
  (nameFile: string): Promise<string>;
}
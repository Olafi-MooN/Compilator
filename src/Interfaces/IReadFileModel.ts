export interface IReadFileModel {
  // (nameFile: string): string;
  (nameFile: string): Promise<string>;
}
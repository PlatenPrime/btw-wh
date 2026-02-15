export class ParseExcelArtsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParseExcelArtsError";
  }
}

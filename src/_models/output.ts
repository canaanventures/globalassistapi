export default class Output {
  public isSuccess: boolean;
  public data: any;
  public message: string;


  public constructor(init?: Partial<Output>) {
    Object.assign(this, init);
  }
}

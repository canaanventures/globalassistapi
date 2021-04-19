

export default class mailOptions {
    public from: string;
    public to: string;
    public subject: string;
    public cc: string;
    public bcc: string;
    public html: string;


    public constructor(init?: Partial<mailOptions>) {
        Object.assign(this, init);
    }
}

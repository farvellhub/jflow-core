import { Animation } from "../animations/";
declare class Handler {
    #private;
    constructor(...animations: Animation[]);
    animate(): void;
    onClick(target: string): Promise<void>;
    onTimeout(time: number): Promise<void>;
    onScroll(offset: number): Promise<void>;
}
export default Handler;

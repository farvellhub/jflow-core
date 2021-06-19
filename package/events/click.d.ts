import State from "../animations/state";
declare class Click {
    keys: Element[];
    constructor(target: string);
    listen(states: State[]): Promise<void>;
}
export default Click;

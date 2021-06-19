import State from "../animations/state";
declare class Time {
    #private;
    constructor(time: number);
    once(states: State[]): Promise<void>;
    loop(...states: State[]): Promise<void>;
    clearLoop(): Promise<void>;
}
export default Time;

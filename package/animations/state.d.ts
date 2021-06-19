import TypeAnimation from "../types/type-animation";
declare class State {
    #private;
    constructor({ element, css, init }: TypeAnimation);
    private initElement;
    private initStates;
    private setInitialState;
    changeState(index: number): void;
    toggleStates(): void;
}
export default State;

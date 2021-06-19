import State from "../animations/state";
declare class Scroll {
    #private;
    constructor(offset: number);
    private isScrolled;
    private controlScroll;
    listen(states: State[]): Promise<void>;
}
export default Scroll;

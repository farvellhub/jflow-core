import State from "./state";

import {
    Click,
    Scroll,
    Time
} from "../events";

class Handler {
    #states: Array<State> = [];

    constructor(...animations) {
        animations.forEach((animation) => {
            this.#states.push(new State(animation));
        });
    }

    public animate() {
        this.#states.forEach((state) => {
            state.toggleStates();
        });
    }

    public onClick(target: string) {
        return new Click(target).listen(this.#states);
    }

    public onTimeout(time: number) {
        return new Time(time).once(this.#states);
    }

    public onScroll(offset: number) {
        return new Scroll(offset).listen(this.#states);
    }
}

export default Handler;
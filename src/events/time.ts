import { State } from "../core/";

class Time {
    #time: number;
    #interval: number;

    constructor(time: number) {
        this.#time = time;
    }

    public async once(states: State[]) {
        setTimeout(() => {
            states.forEach((state) => {
                state.toggleStates();
            });
        }, this.#time);
    }

    public loop(states: State[]) {
        this.#interval = setInterval(() => {
            states.forEach((state) => {
                state.toggleStates();
            });
        }, this.#time);
    }

    public clearLoop() {
        clearInterval(this.#interval);
    }
}

export default Time;
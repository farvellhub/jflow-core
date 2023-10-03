import { State } from "../core/";

// Animate over time.
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

// new Time( 1200 ).once(
//     new State({
//         element: "animable",
//         classes: "stateOn"
//     })
// ).then(() => console.log("finished trigger"));

// new Time( 1000 ).loop(
//     new State({
//         element: "animable",
//         classes: ["stateOn", "stateOff"],
//         init: 0
//     })
// ).then(() => console.log("finished trigger"));
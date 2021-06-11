import State from "../animations/state";

class Time {
    #time: number;
    #interval: NodeJS.Timeout;

    constructor( time: number ) {
        this.#time = time;
    }

    async once( states: State[]): Promise<void> {
        setTimeout(() => {
            states.forEach(( state ) => {
                state.toggleStates();
            });
        }, this.#time );
    }

    async loop( ...states: State[]): Promise<void> {
        this.#interval = setInterval(() => {
            states.forEach(( state ) => {
                state.toggleStates();
            });
        }, this.#time );
    }

    async clearLoop(): Promise<void> {
        clearInterval( this.#interval );
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
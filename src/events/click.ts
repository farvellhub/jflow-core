import State from "../animations/state";

class Click {
    keys: Element[];

    constructor( target: string ) {
        this.keys = [ ...document.querySelectorAll( `.${target}` ) ];
    }

    async listen( ...states: State[]): Promise<void> {
        this.keys.forEach(( trigger: Element ) => {
            trigger.addEventListener( "click", ( e ) => {
                e.stopPropagation();
                states.forEach(( state ) => {
                    state.toggleStates();
                });
            });
        });
    }
}

export default Click;

// new Click("target").listen(
//     new State({
//         element: "animable",
//         classes: ["stateOn", "stateOff"],
//         init: 0
//     }),
//     new State({
//         element: "other-animable",
//         classes: "uniqueState",
//     })
// ).then(() => console.log("finished trigger"));
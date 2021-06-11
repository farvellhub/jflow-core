import {
    Animation,
    State
} from "../animations/";

import {
    Click,
    Hover,
    Scroll,
    Time
} from "./";

class Handler {
    #states: State[];
    
    constructor( ...animations: Animation[]) {
        animations.forEach(( animation ) => {
            this.#states.push( new State( animation ));
        });
    }

    public animate(): void {
        this.#states.forEach(( state ) => {
            state.toggleStates();
        });
    }

    public async onClick( target: string ): Promise<void> {
        return await new Click( target ).listen( this.#states );
    }

    public async onTimeout( time: number ): Promise<void> {
        return await new Time( time ).once( this.#states );
    }
}

export default Handler;
import {
    Animation,
    State
} from "../animations/";

import {
    Click,
    Scroll,
    Time
} from "./";

class Handler {
    #states: Array<State> = [];
    
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

    public async onScroll( offset: number ): Promise<void> {
        return await new Scroll( offset ).listen( this.#states );
    }
}

export default Handler;
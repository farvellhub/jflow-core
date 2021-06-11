import Animation from "./animation";

// Trigger animation state
class State {
    #element: HTMLElement;
    #states: string[];

    constructor({ element, classes, init }: Animation ) {
        this.#element = this.initElement( element );
        this.#states = this.initStates( classes );
        
        this.setInitialState( init );
    }

    private initElement( element: string ): HTMLElement {
        let temp: HTMLElement = document.getElementById( element );

        if ( typeof temp === null ) {
            temp = document.createElement( "div" );
            temp.setAttribute( "id", element );
        }
         
        return temp;
    }

    private initStates( classes: string[] | string ): string[] {
        return ( Array.isArray( classes ))
            ? classes
            : [ classes ];
    }

    private setInitialState( index: number ): void {
        if ( typeof index !== undefined )
            this.changeState( index );
    }

    public changeState( index: number ): void {
        this.#element.classList.toggle( this.#states[ index ]);
    }

    public toggleStates(): void {
        this.#states.forEach(( state ) => {
            this.#element.classList.toggle( state );
        });
    }
}

export default State;

//     new State({
//         element: "animable",
//         classes: ["stateOn", "stateOff"],
//         init: 0
//     })
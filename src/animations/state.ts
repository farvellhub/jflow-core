import TypeAnimation from "../types/type-animation";


// Trigger animation state
class State {
    #element: HTMLElement;
    #states: string[];

    constructor({ element, css, init }: TypeAnimation ) {
        this.#element = this.initElement( element );
        this.#states = this.initStates( css );
        
        this.setInitialState( init as number );
    }

    private initElement( element: string ): HTMLElement {
        return document.getElementById( `${element}` ) as HTMLElement;
    }

    private initStates( css: string[] | string ): string[] {
        return ( Array.isArray( css ))
            ? css
            : [ css ];
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
//         css: ["stateOn", "stateOff"],
//         init: 0
//     })
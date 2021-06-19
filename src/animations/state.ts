import TypeAnimation from "../types/type-animation";


// Trigger animation state
class State {
    #element: HTMLElement;
    #states: string[];

    constructor({ element, classes, init }: TypeAnimation ) {
        this.#element = this.initElement( element );
        this.#states = this.initStates( classes );
        
        this.setInitialState( init as number );
    }

    private initElement( element: string | HTMLElement ): HTMLElement {
        let temp: HTMLElement | null;

        if ( !( element instanceof HTMLElement )) {
            temp = document.createElement( "div" );
            temp.setAttribute( "id", element as string );
            document.body.prepend( temp );
        
        } else { temp = document.getElementById( `${element}` ); }
         
        return temp as HTMLElement;
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
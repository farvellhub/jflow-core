import State from "../core/state";

// Animate over scroll.
class Scroll {
    #offset: number;
    #scroll: number;
    #isActive: boolean;

    constructor( offset: number ) {
        this.#offset = offset;
        this.#scroll = window.scrollY;
        this.#isActive = this.isScrolled();
    }

    private isScrolled(): boolean {
        return this.#scroll >= this.#offset;
    }

    private controlScroll(): boolean {
        return (( this.#scroll <= this.#offset && this.#isActive )
            || ( this.#scroll >= this.#offset && !this.#isActive ));
    }

    public listen( states: State[]) {
        document.addEventListener( "scroll", () => {
            if ( this.controlScroll()) {
                states.forEach(( state ) => {
                    state.toggleStates();
                });
                this.#isActive = !this.#isActive;
            }
        });
    }
}

export default Scroll;
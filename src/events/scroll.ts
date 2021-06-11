import State from "../animations/state";

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

    async listen( ...states: State[]): Promise<void> {
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
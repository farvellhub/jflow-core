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

    }

    async listen( ...states: State[]): Promise<void> {
        document.addEventListener( "scroll", () => {
            if (( scroll <= offset && scrolled ) ||
            ( scroll >= offset && !scrolled )) {

                states.forEach(( state ) => {
                    state.toggleStates();
                });
                return !scrolled;
            }
        });
    }
}

export default Scroll;
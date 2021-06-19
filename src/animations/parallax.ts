import TypeParallax from "../types/type-parallax";

class Parallax {
    #config: Array<TypeParallax> = [];

    constructor( ...config: Array<TypeParallax> ) {

        // Init multiple configs
        this.initConfig( config );
        // Need updates movement at restart
        // Prevents charging scroll at re-render position
        this.updateMovement();
    }

    // Sets config params scroll direction, speed , offset
    private initConfig( config: Array<TypeParallax> ): void {
        config.forEach(( param: TypeParallax ) => {
            const { target, direction, offset } = param;
            this.#config.push({
                target: document.getElementById( target as string ) as HTMLElement,
                direction: ( direction > -2 && direction < 2 )
                    ? direction
                    : 0,
                offset: ( offset ? offset : 0 )
            });
        });
    }

    // Updates movement relative on direction and offset
    private updateMovement( offsetScroll: number = window.scrollY ): void {
        // For each parallax configuration object
        this.#config.forEach(( value: TypeParallax ) => {
            const { target, direction, offset } = value;
            const movement = ( offset! - offsetScroll ) * direction;

            // Only executes if offset arrives to minOffset
            if ( offsetScroll >= offset! )
                ( target as HTMLElement ).style.transform = `translateY( ${ movement }px)`;
        });
    }

    // Real scroll param with request Animation
    private render( offset: number ) {
        window.requestAnimationFrame(() => {
            this.updateMovement( offset );
        });
    }

    // Event handler for scroll
    public async listen(): Promise<void> {
        window.addEventListener( "scroll", () => {
            const offset = window.scrollY;
            this.render( offset );
        });
    }
}

export default Parallax;
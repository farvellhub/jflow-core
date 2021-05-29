/* Parallax movement */

module.exports = class Parallax {

    // ... HTMLElement, dir 1 = up | -1 = down, minOffset in pixels to active scroll
    constructor( ...config ) {       
        
        // Init multiple configs
        this.config = [];
        this._initConfig( config );
        // Need updates movement at restart
        // Prevents charging scroll at re-render position
        this._updateMovement();

        // Return listen to move scroll
        return Object.freeze(Object.create({

            listen: this.listen.bind( this )

        }));
    }

    _initConfig( config ) {
        config.forEach(( value ) => {
            this.config.push({
                target: document.getElementById( value.target ),
                direction: value.direction,
                offset: (value.offset ? value.offset : 0)
            })
        });
    }

    // Updates movement relative on direction and offset
    _updateMovement() {
        const offset = window.scrollY;

        // For each parallax configuration object
        this.config.forEach(( value ) => {
            const style = value.target.style,
                movement = ( offset - value.offset ) * value.direction;

            // Only executes if offset arrives to minOffset
                if ( offset > value.offset ) 
                    style.transform = `translateY( ${ movement }px)`;
        });
    }

    // Event handler for scroll
    async listen() {
        window.addEventListener("scroll", () => {
            this._updateMovement();
        });
    }

}

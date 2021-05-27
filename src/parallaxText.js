/* Parallax movement */

export default class Parallax {

    // HTMLElement, dir 1 = up | -1 = down, minOffset in pixels to active scroll
    constructor( config ) {
        this.target = document.getElementById( config["target"] );
        
        this. direction = config["direction"];
        this.minOffset = config["offset"] ? config["offset"] : 0;

        // Need updates movement at restart
        // Prevents charging scroll at re-render position
        this._updateMovement();

        // Return listen to move scroll
        return Object.freeze(Object.create({

            listen: this.listen.bind( this )

        }));
    }

    // Updates movement relative on direction and offset
    _updateMovement() {
        const offset = window.scrollY,
            style = this.target.style,
            movement = ( offset - this.minOffset ) * this.direction;

        // Only executes if offset arrives to minOffset
        if ( offset > this.minOffset ) 
            style.transform = `translateY( ${ movement }px)`;
    }

    // Event handler for scroll
    listen() {
        window.addEventListener("scroll", () => {
            this._updateMovement();
        });
    }

}

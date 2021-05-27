/* Parallax movement */

export default class Parallax {

    // HTMLElement, dir 1 = up | -1 = down, minOffset in pixels to active scroll
    constructor( target, direction = 1, minOffset = 0 ) {
        this.target = document.getElementById( target );
        
        this. direction = direction;
        this.minOffset = minOffset;

        // Need updates movement at restart
        // Prevents charging scroll in other position
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

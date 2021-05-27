// Generic handler

module.exports = class Handler {

    // Animation { element: idName, css: className || [className] }
    constructor( ...animations ) {
        this.animations = [];
        this._initAnimations( animations );

        // Return event methods
        return Object.freeze(Object.create({

            onTimeout: this.onTimeout.bind( this ),
            onClick: this.onClick.bind( this ),
            onScroll: this.onScroll.bind( this )

        }));

        const initP
    }

    // Setting animations object and css array
    _initAnimations( animations ) {
        animations.forEach(( a, i ) => {
            this.animations.push({
                element: document.getElementById( a.element ),
                css: Array.isArray( a.css ) ? a.css : [ a.css ]
            });

            this._setDefaultAnimation( i );
        });
    }

    // If css provided is not an array
    _setDefaultAnimation( index ) {
        const animation = this.animations[ index ],
            element = animation.element,
            css = animation.css;

        if ( css.length > 1 )
            this._toggleAnimation( element, css[0] );
    }

    // Toggle class list item
    _toggleAnimation( element, css ) { element.classList.toggle( css ); }

    // For each animation, animate
    _animate() {
        this.animations.forEach(( animation ) => {
            animation.css.forEach(( cssName ) => {
                this._toggleAnimation( animation.element, cssName );
            });        
        });
    }

    // Timeout event, animate given time
    onTimeout( time ) {
        setTimeout(() => {
            this._animate(); 
        }, time);

        return this;
    }

    // Click event triggers animation
    onClick( controls ) {
        const keys = document.querySelectorAll( `.${controls}` );

        keys.forEach(( e ) => {
            e.addEventListener("click", () => {
                this._animate();
            });
        });

        return this;
    }

    // Given a offset 
    _initScroll( offset ) {
        if ( window.scrollY >= offset ) {
            this._animate();
            return true;
        }

        return false;
    }

    // Scroll event triggers animation
    onScroll( offset ) {
        let scrolled = this._initScroll( offset );

        document.addEventListener("scroll", () => {
            const scroll = window.scrollY;

            if (( scroll <= offset && scrolled ) || 
                ( scroll >= offset && !scrolled )) {
                
                scrolled  = !scrolled;
                this._animate();
            }
        });

        return this;
    }

}
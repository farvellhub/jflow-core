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
    }

    // Setting animations object and css array
    _initAnimations( animations ) {
        animations.forEach(( anim, index ) => {
            this.animations.push({
                element: document.getElementById( anim.element ),
                css: Array.isArray( anim.css ) ? anim.css : [ anim.css ]
            });

            this._setDefaultAnimation( index );
        });
    }

    // If css provided is not an array
    _setDefaultAnimation( index ) {
        if ( css.length > 1 ) {
			const animation = this.animations[ index ],
				element = animation.element,
				css = animation.css;

            this._toggleAnimation( element, css[0] );
		}
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
    async onTimeout( time ) {
        const timer = setTimeout(() => {
            this._animate();
        }, time);
		
        return this;
    }

    // Click event triggers animation
    async onClick( controls ) {
        const keys = document.querySelectorAll( `.${controls}` );

        keys.forEach(( trigger ) => {
            trigger.addEventListener("click", ( e ) => {
				e.stopPropagation();
                this._animate();
            });
        });

        return this;
    }

	// If Offset is inside conditions, animate
	_triggerScroll( scroll, offset, scrolled ) {
		if (( scroll <= offset && scrolled ) || 
            ( scroll >= offset && !scrolled )) {
                
            this._animate();
			return !scrolled;
        }

		return scrolled;
	}

    // Controls scroll when loads document
    _initScroll( offset ) {
        if ( window.scrollY >= offset ) {
            this._animate();
            return true;
        }

        return false;
    }

    // Scroll event triggers animation
    async onScroll( offset ) {
        let scrolled = this._initScroll( offset );

        document.addEventListener("scroll", () => {
            const scroll = window.scrollY;
			scrolled = this.triggerScroll( scroll, offset, scrolled );
        });

        return this;
    }

}
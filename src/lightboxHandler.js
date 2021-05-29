// Lightbox event handler 

module.exports = class LightboxHandler {

    // ... Animation { element: idName, css: className || [className] }
    constructor( ...animations ) {

        // Init array of animations.
        this.animations = [];
        this._initAnimations( animations );

        // Return function to Lightbox logic
        return Object.freeze(Object.create({

            setAfterFunc: this.setAfterFunc.bind( this ),
            lastClicked: this.lastClicked.bind( this ),
            onClick: this.onClick.bind( this )

        }));
    }

    // Setting animations object and css array
    _initAnimations( animations ) {
        animations.forEach(( a ) => {
            this.animations.push({
                element: document.getElementById( a.element ),
                css: Array.isArray( a.css ) ? a.css : [ a.css ]
            });
        });
        
        this._setDefaultAnimation();
        
    }

    // If css provided is an array
    _setDefaultAnimation() {
        if ( this.animations.length > 1 ) {
            const animation = this.animations[0],
                element = animation.element,
                css = animation.css

            this._animateByCss( element, css[0] );
        }
    }

    // Needs for logic in Lightbox, controls roullette updates
    setAfterFunc( func, that, ...args ) {
        this._afterFunc = () => {
            if ( typeof func == "function"
                && typeof that == "object" )
                return that[ func.name ]( args );
        };

        return this;
    }

    // Only update animation if its condition returns true
    _isConditioned( conditions ) {
        if ( conditions === null ) return false;
            
        const classList = this.lastClick.element.classList;
        let isConditioned = false;

        Object.keys( conditions ).forEach(( c ) => {
            if ( classList.contains( conditions[ c ] ) ) 
                isConditioned = true;
        });

        return isConditioned;
    }

    // Toggle class list item
    _toggleAnimation( element, css ) { element.classList.toggle( css ); }

    // For each animation, animate
    _animate() {
        this.animations.forEach(( a ) => {
            a.css.forEach(( c ) => {
                this._toggleAnimation( a.element, c );
            });        
        });
    }

    // Controls if have conditions
    _trigger( conditions ) {
        if ( this._isConditioned( conditions ) ) return;

        this._animate();
    }

    // Execute all functions atached to the event
    _execution( conditions = null ) {
        this._trigger( conditions );
        
        if ( typeof this._afterFunc === "function" )
            this._afterFunc();
    }

    // Needs in Lightbox class, return last clicked element
    lastClicked() { return this.lastClick; }

    // Each click updates lastClick variable 
    async onClick( controls, conditions ) {
        const keys = document.querySelectorAll( controls );

        keys.forEach(( e, i ) => {
            e.addEventListener("click", () => {
                this.lastClick = { 
                    "element": e,
                    "index": (i - 1) 
                };

                this._execution( conditions );
            });
        });

        return this;
    }
}
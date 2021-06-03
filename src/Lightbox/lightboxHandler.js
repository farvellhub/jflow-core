const Handler = require("../eventHandler");

// Lightbox event handler 
module.exports = class LightboxHandler extends Handler {

    // ... Animation { element: idName, css: className || [className] }
    constructor( ...animations ) {

        // Init animations.
        super( animations );

        // Return function to Lightbox logic
        return Object.freeze(Object.create({

            setAfterFunc: this.setAfterFunc.bind( this ),
            lastClicked: this.lastClicked.bind( this ),
            onClick: this.onClick.bind( this )

        }));
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
        const keys = document.querySelectorAll( `.${controls}` );

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
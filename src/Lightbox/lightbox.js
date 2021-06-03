const LightboxHandler = require( "./lightboxHandler" ),
	LightboxConstructor = require( "./lightboxConstructor" );

// Lightbox logic and constructor
module.exports = class Lightbox {

    // fetching data classes to control lightbox
    constructor( config ) {
        // Set param config
		this.config = new LightboxConstructor( config );

        // Initializing handler
        this.handler = new LightboxHandler({
            element: "lightbox",
            css: config.css
        });

        // Init roullette of images
        this._initRoullette();

        // Return listen lightbox
        return this.listen();
    }

    // initializing roullette from fetched images
    _initRoullette() {
        this.config.images.forEach(( img, index ) => {
            const image = img.cloneNode(),
                text = this.config.texts[ index ];

            // Reset image element to lightbox css classes
            image.classList.remove( ...image.classList );
            image.classList.add( "roullette-image", this.control );

            // Pushing images to roullete
            this.config.roullette.img.appendChild( image );
            this.config.roullette.txt.push( text.textContent );
        });

        // Finally sets the lightbox size to length of roullette
        this.lightboxSize = this.config.roullette.txt.length;
    }

    // SETTERS
    _setPhoto( src ) { this.config.lightbox.photo.src = src; }
    _setCaption( text ) { this.config.lightbox.caption.textContent = text; }

    // Update position ( certain positions are conditioned buttons )
    _setLastPosition( position ) { this.lastPosition = position; }

    _updateFromAll( position ) {
        const photo = this.config.roullette.img.children,
            caption = this.config.roullette.txt;

        this._setPhoto( photo.position.src );
        this._setCaption( caption.position );
    }

    // Update from previous button
    _updateFromPrevious() {
        const position = this.lastPosition > 0
            ? --this.lastPosition 
            : this.lightboxSize;

        this._updateFromAll( position );
        
        return position;
    }

    // Update from next button
    _updateFromNext() {
        const position = this.lastPosition < this.lightboxSize
            ? ++this.lastPosition 
            : 0;

        this._updateFromAll( position );

        return position;
    }

    // Update from roullete image
    _updateFromRoullette( index ) {
        const length = this.config.conditions.length,
            position = index - length;

        this._updateFromAll( position );

        return position;
    }

    // Update from grid of images
    _updateFromImages( index ) {
        const length = this.config.conditions.length,
            position = ( index - this.lightboxSize)  - length;

        this._updateFromAll( position );

        return position;
    }

    // If conditions return True
    _validUpdate ( classList, name ) {
        const conditions = this.config.conditions;

        return classList.contains( conditions.name );
    }

    // Route depending on position
    _updateFrom( classList, index ) {
        let position;

        if ( this._validUpdate( classList, "roullette" ) ) {
            position = this._updateFromRoullette(index);

        } else if ( this._validUpdate( classList, "previous" ) ) {
            position = this._updateFromPrevious();

        } else if ( this._validUpdate( classList, "next" ) ) {
            position = this._updateFromNext();

        } else { position = this._updateFromImages( index ); }

        this._setLastPosition( position );
    }

    // Update state from all conditions
    _update() {
        
        const lastClick = this.handler.lastClicked(),
            classList = lastClick.element.classList;
            
        if ( classList.contains( this.config.exit ) ) return;

        this._updateFrom( classList, lastClick.index );
    }

    // Listener handler
    async listen() {
        this.handler.setAfterFunc( this._update, this ); 
        return this.handler.onClick( this.config.control, this.conditions )
			.then( console.log( "Lightbox is working!" ) );
    }
}
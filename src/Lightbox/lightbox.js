const LightboxHandler = require( "./lightboxHandler" );

// Lightbox logic and constructor
module.exports = class Lightbox {

    // fetching data classes to control lightbox
    constructor( config ) {
        
		// Add Lightbox to DOM
		this._createLightbox();

        // Initializing data object
        this._constructLightbox( config );

        // Initializing handler
        this.handler = new LightboxHandler({
            element: "lightbox",
            css: data["css"]
        });

        // Init roullette of images
        this._initRoullette();

        // Return listen lightbox
        return Object.freeze(Object.create({

            listen: this.listen.bind( this )
            
        }));
    }

	_createLightbox() {
		const body = document.getElementsByTagName( body );

		body.innerHTML += `
			<section id="lightbox">
				<span class="lightbox-close lightbox-control">x</span>
					
				<figure>
					<span class="previous-button lightbox-control"><</span>
					<img id="lightbox-photo" src="#" alt="lightbox-main-photo">
					<span class="next-button lightbox-control"><</span>
				</figure>

				<p id="lightbox-caption" class="caption"></p>
				<nav id="lightbox-roullette" class="roullette"></nav>
			</section>
		`;
	}

    // Setting lightbox properties
    _constructLightbox( data ) {
        this.images = document.querySelectorAll( data["images"] );
        this.texts = document.querySelectorAll( data["texts"] );

        this.lightbox = {
            photo: document.getElementById( "lighbox-photo" ),
            caption: document.getElementById( "lightbox-caption" ),
        };

        this.roullette = {
            img: document.getElementById( "lightbox-roullette" ),
            txt: []
        };

        this.control = ".lightbox-control";
        this.exit = "lightbox-close";
        this.conditions = {
            roullette: "roullette-image",
            previous: "previous-button", 
            next: "next-button",
            length: 2
        };
    }

    // initializing roullette from fetched images
    _initRoullette() {
        this.images.forEach(( e, i ) => {
            const image = e.cloneNode(),
                text = this.texts[ i ];

            // Reset image element to lightbox css classes
            image.classList.remove( ...image.classList );
            image.classList.add( "roullette-image", this.control );

            // Pushing images to roullete
            this.roullette.img.appendChild( image );
            this.roullette.txt.push( text.textContent );
        });

        // Finally sets the lightbox size to length of roullette
        this.lightboxSize = this.roullette.txt.length;
    }

    // SETTERS
    _setPhoto( src ) { this.lightbox.photo.src = src; }
    _setCaption( text ) { this.lightbox.caption.textContent = text; }

    // Update position ( certain positions are conditioned buttons )
    _setLastPosition( position ) { this.lastPosition = position; }

    _updateFromAll( position ) {
        const photo = this.roullette.img.children,
            caption = this.roullette.txt;

        this._setPhoto( photo[ position ].src );
        this._setCaption( caption[ position ] );
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
        const length = this.conditions.length,
            position = index - length;

        this._updateFromAll( position );

        return position;
    }

    // Update from grid of images
    _updateFromImages( index ) {
        const length = this.conditions.length,
            position = ( index - this.lightboxSize)  - length;

        this._updateFromAll( position );

        return position;
    }

    // If conditions return True
    _validUpdate ( classList, name ) {
        const conditions = this.conditions;

        return classList.contains( conditions[ name ]);
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
            
        if ( classList.contains( this.exit ) ) return;

        this._updateFrom( classList, lastClick.index );
    }

    // Listener handler
    async listen() {
        this.handler.setAfterFunc( this._update, this ); 
        return this.handler.onClick( this.control, this.conditions )
			.then( console.log( "Lightbox is working!" ) );
    }
}
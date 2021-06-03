const Style = require( "../style" );

// Lightbox DOM constructor
module.exports = class LightboxConstructor {
	constructor( config ) {
		this._createLightbox();
		this._styleLightbox( config.color );
		
		return this._setLightboxConfig( config )
	}
	
    // Setting lightbox properties
	_setLightboxConfig( config ) {
		return {
			images: [ ...document.getElementsByClassName( config.images ) ],
			texts: [ ...document.getElementsByClassName( config.texts ) ],
			lightbox: {
				photo: document.getElementById( "lighbox-photo" ),
				caption: document.getElementById( "lightbox-caption" ),
			},
			roullette: {
				img: document.getElementById( "lightbox-roullette" ),
				txt: []
			},
			control: "lightbox-control",
        	exit: "lightbox-close",
        	conditions: {
           		roullette: "roullette-image",
            	previous: "previous-button", 
            	next: "next-button",
            	length: 2
			}
        };
	}

	// Putting lightbox html to DOM
	_createLightbox() {
		const wrapper = document.createElement( "section" );
		
		wrapper.setAttribute( "id", "lightbox" )
			.setAttribute( "class", "fixed-wrapper lightbox-wrapper" );

		wrapper.innerHTML += `
			<span class="button fixed-button lightbox-close lightbox-control">x</span>

			<section class="wrapper lightbox">
				<figure class="wrapper lightbox-photo-wrapper">
					<article class="lightbox-previous">
						<span class="button lightbox-button vertical-align previous-button lightbox-control"><</span>
					</article>
					<img id="lightbox-photo" class="lightbox-photo all-align" src="#" alt="lightbox-main-photo">
					<article class="lightbox-next">
						<span class="button lightbox-button vertical-align next-button lightbox-control"><</span>
					</article>
				</figure>
			</section>

			<p id="lightbox-caption" class="horizontal-align lightbox-caption"></p>
			<nav id="lightbox-roullette" class="horizontal-align roullette"></nav>
		`;
		
		document.body.style.position = "relative";
		document.body.appendChild( wrapper );
	}

	_styleLightbox( color = "#1d1d1d" ) {
		new Style({

			backgroundColor: color

		}).setStyles( "lightbox-wrapper" );
	}
}
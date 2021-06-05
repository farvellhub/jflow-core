// Converts style objetcs into html props.
module.exports = class Style {
	constructor( styles ) {
		// Object containig style keys
		this.styles = styles;

		// Return set styles
		return Object.freeze( Object.create({

			setStyles: this.setStyles.bind( this )

		}));
	}

	// Set styles to targets clasName
	setStyles( className ) {
		this.elements = [ ...document.getElementsByClassName( className ) ];

		this.elements.forEach(( element ) => {
			const props = Object.keys( this.styles );

			props.forEach(( key ) => {
				element.style.key = key;
			});
		});

		return this.elements;
	}
};
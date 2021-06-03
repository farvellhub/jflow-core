// Converts style objetcs into html props.

module.exports = class Style {
	constructor( styles ) {
		// Object containig style keys
		this.styles = styles;

		// Return set styles
		return Object.freeze(Object.create({

			setStyles: this.setStyles.bind( this )

		}));

	}

	// Set styles to targets clasName
	setStyles( className ) {
		this.elements = [ ...document.getElementsByClassName( className ) ];

		this.elements.forEach(( element ) => {
			Object.keys( this.styles ).forEach(( key ) => {
				element.style.key = this.styles.key;
			});
		});

		return this.elements;
	}
}
// Create a new stylesheet for the BoxShadowImage rule(s)

export class BoxShadowCSS {
	constructor(target) {
		this.selector = this.getSelector(target);
		this.style = document.createElement("style");
		document.head.appendChild(this.style);
	}

	// Return CSS selector from target
	getSelector(target) {
		if(target && target instanceof Element) {
			// Return the id of the element
			return "#" + target.id;
		}
		// Return passed argument or null if it's falsy
		return target ? target : null;
	}

	// Insert a new box-shadow rule
	applyCSS(css) {
		if(!this.selector) {
			throw new ReferenceError("Can not apply CSS rule to empty target");
		}

		try {
			this.style.sheet.deleteRule(0);
		}
		catch {
			// Ignore empty stylesheet
		}
		
		// Insert the final box-shadow CSS property as a new rule
		css = `${this.selector}{box-shadow:${css}}`;
		this.style.sheet.insertRule(css);
	}

	// Remove the created style element (by extension, stylesheet) from the DOM
	destroy() {
		this.style.parentElement.removeChild(this.style);
	}
}
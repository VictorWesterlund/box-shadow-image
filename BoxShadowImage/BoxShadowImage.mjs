import { BoxShadowCSS } from "./BoxShadowCSS.mjs";

// Draw an image using only CSS box-shadow values

export class BoxShadowImage {
	constructor(element = false) {
		this.target = element ? element : this.createElement(); // Create element if no target was passed
		this.style = new BoxShadowCSS(this.target);

		this.scale = 20; // Size modifier
		this.cursor = {x:0, y:0};
		this.res = {x:32, y:32};

		// Array of box-shadow values for each pixel
		this.buffer = [];
	}

	// Create and return a target element
	createElement() {
		// Generate an id from a prefix and a random number
		const id = "bsi-" + Math.floor(Math.random() * 10000);
		if(document.getElementById(id)) {
			// Generate a new id if it already exists
			return this.createElement();
		}

		// Create and prepare the new element
		const element = document.createElement("div");
		element.id = id;
		element.style.setProperty("position","absolute");
		element.style.setProperty("width","0px");
		element.style.setProperty("height","0px");
		return element;
	}

	// Append a box-shadow value and advance the cursor
	pushPixel(color = "#000000") {
		if(this.cursor.x >= (this.res.x - 1)) {
			// Advance to the next scanline
			this.cursor.x = 0;
			this.cursor.y++;
		}

		if(this.cursor.y >= (this.res.y - 1)) {
			// We've reached the end of this frame
			return false;
		}

		const x = this.cursor.x * this.scale;
		const y = this.cursor.y * this.scale;

		const pixel = `${x}px ${y}px 0px ${this.scale}px ${color}`;
		this.buffer.push(pixel);
		
		this.cursor.x++;
	}

	// Append an array of colors as a frame
	pushFrame(pixels) {
		pixels.forEeach(pixel => this.pushPixel(pixel));
	}

	// Stringify the buffer and let the CSS engine render the image
	draw() {
		const output = this.buffer.join(",");
		this.style.applyCSS(output);
	}
}
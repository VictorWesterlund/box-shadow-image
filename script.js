import { BoxShadowImage } from "./BoxShadowImage/BoxShadowImage.mjs";

const img = new BoxShadowImage();

// Create a sample pattern
for(var i = 0;i < 1000;i++) {
	let color = (i * 4).toString(16);

	if(color.length == 1) {
		color = "00" + color;
	}
	else if(color.length == 2) {
		color = "0" + color;
	}

	img.pushPixel("#" + color);
}

img.draw();
document.body.appendChild(img.target);
import reactDom from "react-dom";
import React, { Component } from 'react';
import Keypad from './Keypad';
import ColorView from './ColorView';
import Screens from './Screens';

class Calculator extends Component {

    constructor(props){
        super(props);

        this.state = {
           gradient: false,
           hexOne: "#000000",
           hexTwo: "#FFFFFF",
           code: ""
        }
    }
    
    onClick = (button) => {
        console.log(`${button} has been clicked`);
        if (button === "Clear"){
            this.setState({
                code: "",
                hexOne: "#000000",
                hexTwo: "#FFFFFF",
                gradient: false
            });
        }
        else if (button === "Blend"){
            if (this.state.gradient === false){
                this.setState({
                    gradient: true
                })
            }
            else {
                this.setState({
                    gradient: false
                })
            }
            
        }
        else if ( button === "Swap"){
            this.setState({
                hexOne: this.state.hexTwo,
                hexTwo: this.state.hexOne
            })
        }
        else if (button === "Left"){
            if (this.state.code.length === 6){
                this.setState({
                    hexOne: "#" + this.state.code,
                    code: ""
                })
                }
            else if (this.state.code.length === 3){
                let fullCode = this.state.code
					.split("")
					.map(function (hex) {
						return hex + hex;
					})
					.join("");
                this.setState({
                    hexOne: "#" + fullCode,
                    code: ""
                })
            }           
        }
        else if (button === "Right"){
            if (this.state.code.length === 6){
                this.setState({
                    hexTwo: "#" + this.state.code,
                    code: ""
                })
                }
            else if (this.state.code.length === 3){
                let fullCode = this.state.code
					.split("")
					.map(function (hex) {
						return hex + hex;
					})
					.join("");
                this.setState({
                    hexTwo: "#" + fullCode,
                    code: ""
                })
            }           
        }
        else if ( button === "Back"){
            this.setState({
                code: this.state.code.slice(0, -1)
            })
        }
        else if (button === "Left Complimentary") {
			this.setState({
				hexTwo: this.hexToComplimentary(this.state.hexOne),
			});
		} else if (button === "Right Complimentary") {
			this.setState({
				hexOne: this.hexToComplimentary(this.state.hexTwo),
			});
		}
        else {
            if(this.state.code.length < 6){
                this.setState({
                    code: this.state.code + button
                })
            }
        }
    }
    hexToRGB = (hex) => {
		hex = hex.replace(/^#?([0-9a-f]{6})$/i, "$1");
		hex = Number(`0x${hex}`);

		// Shift the appropriate values using bitwise
		// operators and combine them into rgb array output
		return [
			(hex >> 16) & 0xff, // red
			(hex >> 8) & 0xff, // green
			hex & 0xff, // blue
		];
	};

	hexToComplimentary(hex) {
		// Convert hex to rgb
		let rgb = this.hexToRGB(hex);

		let r = rgb[0],
			g = rgb[1],
			b = rgb[2];

		// Convert RGB to HSL
		r /= 255.0;
		g /= 255.0;
		b /= 255.0;
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		let h,
			s,
			l = (max + min) / 2.0;

		if (max === min) {
			h = s = 0; //achromatic
		} else {
			let diff = max - min;
			s = l > 0.5 ? diff / (2.0 - max - min) : diff / (max + min);

			if (max === r && g >= b) {
				h = (1.0472 * (g - b)) / diff;
			} else if (max === r && g < b) {
				h = (1.0472 * (g - b)) / diff + 6.2832;
			} else if (max === g) {
				h = (1.0472 * (b - r)) / diff + 2.0944;
			} else if (max === b) {
				h = (1.0472 * (r - g)) / diff + 4.1888;
			}
		}

		h = (h / 6.2832) * 360.0 + 0;

		// Shift hue to opposite side of wheel and convert to [0-1] value
		h += 180;
		if (h > 360) {
			h -= 360;
		}
		h /= 360;

		// Convert h s and l values into r g and b values
		if (s === 0) {
			r = g = b = l; // achromatic
		} else {
			const hue2rgb = function hue2rgb(p, q, t) {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1 / 6) return p + (q - p) * 6 * t;
				if (t < 1 / 2) return q;
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
				return p;
			};

			const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			const p = 2 * l - q;

			r = hue2rgb(p, q, h + 1 / 3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1 / 3);
		}

		r = Math.round(r * 255);
		g = Math.round(g * 255);
		b = Math.round(b * 255);

		// Convert r b and g values to hex
		rgb = b | (g << 8) | (r << 16);
		return "#" + (0x1000000 | rgb).toString(16).substring(1);
	}


render(){

    

    return (
        <div className="calc-body">
            <ColorView gradient={this.state.gradient} hexOne={this.state.hexOne} hexTwo={this.state.hexTwo}/>
            <Screens hexOne={this.state.hexOne} hexTwo={this.state.hexTwo} code={this.state.code}/>
            <Keypad onClick={this.onClick}/>

        </div>
    );
}
}

export default Calculator;
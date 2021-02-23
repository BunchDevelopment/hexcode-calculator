import React, { Component } from 'react';

class ColorView extends Component{

render(){

    let gradientView;

    let { hexOne, hexTwo, gradient } = this.props;

    if (gradient){
        gradientView = {
            background: `linear-gradient(to right, ${hexOne}, ${hexTwo})`
        }
    } else {
        gradientView = {
            background: `linear-gradient(to right, ${hexOne} 0%, ${hexOne} 50%, ${hexTwo} 50%, ${hexTwo} 100%)`
        }
    }

    return (
        <div className ="color-view"
        style={gradientView}
        >
            
        </div>
        );
}



}

export default ColorView;
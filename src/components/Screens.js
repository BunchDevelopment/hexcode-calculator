import React, { Component } from 'react';

class Screens extends Component{
    render(){

        let { hexOne, code, hexTwo } = this.props;
        return (
            <div className="screens">
                <div className="code-screen sc1">
					<p>{hexOne}</p>
				</div>
				<div className="code-screen sc2">
					<p>#{code}</p>
				</div>
                <div className="code-screen sc3">
					<p>{hexTwo}</p>
				</div>
			</div>
        )
    }
}

export default Screens;
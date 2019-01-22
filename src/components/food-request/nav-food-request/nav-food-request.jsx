
import React, { Component } from 'react';
import './nav-food-request.css';

class NavFoodRequest extends Component {

    constructor() {
        super();
        this.onClicked = this._onClicked.bind(this);
    }

    _onClicked() {
        const callback = this.props.onClicked;
        
        if (callback) {
            callback();
        }
    }

    render() {
        return (
            <div className="grid-100 nav-food-wrapper" onClick={this.onClicked}>
                <div className="grid-50">
                    <label className="nav-food-content" >{
                        this.props.text
                    } 
                    </label>
                </div>
                <div className="grid-50">
                    <span id="toggle-nav" className="arrow-down-nav" />
                </div>
            </div>
        );
    }
}

export default NavFoodRequest;
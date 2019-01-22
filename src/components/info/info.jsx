import React, { Component } from 'react';
import $ from 'jquery';
import InfoModal from './info-modal';

import './info.css';

class Info extends Component {
    constructor() {
        super();
        this.onCLicked = this._onClicked.bind(this);
    }
    _onClicked() {
        $('body').addClass('modal-opened');
        $(`.${this.props.classReference}`).addClass('modal-visible');
    }

    render() {
        const { modalTitle, description, iconSizeClass, classReference, tagTitle } = this.props;
        return(
            <div className="grid-100 info-container">
                <i title={tagTitle} className={`fas fa-question-circle ${iconSizeClass}`}
                onClick={this.onCLicked} ></i>
                <InfoModal title={modalTitle} classReference={classReference} description={description}/>
            </div>
        );
    }
}

export default Info;
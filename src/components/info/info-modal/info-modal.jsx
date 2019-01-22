import React, { Component } from 'react';
import $ from 'jquery';

import './info-modal.css';

class InfoModal extends Component {
    constructor() {
        super();
        this.onOkClicked = this._onOkCLicked.bind(this);
    }

    _onOkCLicked() {
        $('body').removeClass('modal-opened');
        $('.modal-info').removeClass('modal-visible');
    }

    render() {
        const { title, description, classReference } = this.props;
        return(
            <div className={`modal modal-info ${classReference}`}>
                <div className="modal-content">
                    <h3 className="modal-text"> { title }</h3>
                    <div>
                        <div className="grid-100 modal-description">
                            {
                                description
                            }
                        </div>
                    </div>
                    <div className="button-content grid-100">
                        <div className="grid-50">
                            <button className="btn" onClick={this.onOkClicked}> 
                                <i className="fas fa-check-square"></i> Ok 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoModal;
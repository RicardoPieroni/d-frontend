import React, { Component } from 'react';
import $ from 'jquery';

class RemoveFoodModal extends Component {
    constructor() {
        super();
        this.onCancelCLicked = this._onCancelClicked.bind(this);
        this.onConfirmClicked = this._onConfirmClicked.bind(this);
    }

    _onCancelClicked() {
        $('body').removeClass('modal-opened');
        $('.modal-remove-food').removeClass('modal-visible');
    }

    _onConfirmClicked() {
        const callback = this.props.onConfirmRemoveFodd;
        if (callback) {
            callback();
        }
    }

    render() {
        return (
            <div className="modal modal-remove-food">
                <div className="modal-content ">
                    <h3 className="modal-text"> Deseja remover o item?</h3>
                    <div>
                        <div className="grid-100">
                            <div className="grid-30">
                                <button className="btn btn-save" onClick={this.onConfirmClicked} > 
                                    <i className="fas fa-check-square"></i> Remover 
                                </button>
                            </div>
                            <div className="grid-30">
                                <button className="btn-discard" onClick={this.onCancelCLicked} > 
                                    <i className="fas fa-ban"></i> Cancelar 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RemoveFoodModal;

import React, { Component } from 'react';
import $ from 'jquery';

class FoodRequestListCancelModal extends Component {

    constructor() {
        super();
        this.onCancelClicked = this._onCancelClicked.bind(this);
        this.onConfirmClicked = this._onConfirmClicked.bind(this);
    }

    _onConfirmClicked() {
        const callback = this.props.onConfirmRequestCancel;
        $('body').removeClass('modal-opened');
        $('.modal-food-request-list-cancel').removeClass('modal-visible');
        if (callback) {
            callback();
        }
    }

    _onCancelClicked() {
        $('body').removeClass('modal-opened');
        $('.modal-food-request-list-cancel').removeClass('modal-visible');
    }

    render() {
        return (
            <div className="modal modal-food-request-list-cancel">
                <div className="modal-content content-request-cancel">
                    <h3 className="modal-text"> Deseja cancelar o pedido?</h3>
                    <div className="grid-100">
                    <div className="grid-50">
                            <button className="btn btn-save" onClick={this.onConfirmClicked}> 
                                <i className="fas fa-check-square"></i> Confirmar 
                            </button>
                        </div>
                        <div className="grid-50">
                            <button className="btn-discard" onClick={this.onCancelClicked} > 
                                <i className="fas fa-ban"></i> Cancelar 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FoodRequestListCancelModal;
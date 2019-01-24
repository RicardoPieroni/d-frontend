import React, { Component } from 'react';
import $ from 'jquery';

import './increase-ingredient-modal.css';

class IncreaseIngredientModal extends Component {

    constructor() {
        super()
        this.onCancelCLickd = this._onCancelCLickd.bind(this);
        this.onConfirmClicked = this._onConfirmClicked.bind(this);
    }

    _onCancelCLickd() {
        $('body').removeClass('modal-opened');
        $('.modal-increase-ingredient').removeClass('modal-visible');
    }

    _onConfirmClicked() {
        const callback = this.props.onConfirmAddIngredients;
        if (callback) {
            callback();
        }
    }

    render() {
        const ingredientList = this.props.ingredientList;
        return(
            <div className="modal modal-increase-ingredient">
                <div className="modal-content content-increase-ingredient">
                    <h3 className="modal-text"> Adicionar Ingredientes</h3>
                    <div>
                        <div className="grid-100">
                            {
                                ingredientList && ingredientList.map((ingredient, index) => (
                                    <div className="grid-100" key={ingredient._id}>
                                        <div className="grid-30">
                                            <label >{ingredient.name}</label>
                                        </div>
                                        <div className="grid-20">
                                            <label>{ `R$ ${ingredient.price.toFixed(2)}` }</label>
                                        </div>
                                        <div className="grid-50">
                                        <input type="number" placeholder="Quantidade"
                                        min="1" max="15"
                                        onChange={(e) => this.props.onAmountIncreaseModalChanged(e)}
                                        name={`amout-${ingredient._id}`} id={`amout-${ingredient._id}`}
                                    />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="button-content grid-100">
                        <div className="grid-50">
                            <button className="btn btn-save" onClick={this.onConfirmClicked}> 
                                <i className="fas fa-check-square"></i> Adicionar 
                            </button>
                        </div>
                        <div className="grid-50">
                            <button className="btn-discard" onClick={this.onCancelCLickd} > 
                                <i className="fas fa-ban"></i> Cancelar 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IncreaseIngredientModal;
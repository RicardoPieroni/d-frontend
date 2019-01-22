import React, { Component } from 'react';

import './increase-ingredient-modal.css';

class IncreaseIngredientModal extends Component {
    render() {
        const ingredientList = this.props.ingredientList;
        return(
            <div className="modal modal-increase-ingredient">
                <div className="modal-content">
                    <h3 className="modal-text"> Adicionar Ingredientes</h3>
                    <div>
                        <div className="grid-100">
                            {
                                ingredientList && ingredientList.map((ingredient, index) => (
                                    <div className="grid-100" key={ingredient._id}>
                                        <div className="grid-50">
                                            <input type="checkbox" key={index} name={`checkbox-${ingredient._id}`} value={ingredient.name}/>
                                            <label >{ingredient.name}</label>
                                        </div>
                                        <div className="grid-50">
                                            <input type="number" placeholder="Quantidade"
                                                name={`amout-${ingredient._id}`}
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="button-content grid-100">
                        <div className="grid-50">
                            <button className="btn btn-save"> 
                                <i className="fas fa-check-square"></i> Confirm 
                            </button>
                        </div>
                        <div className="grid-50">
                            <button className="btn btn-save" > 
                                <i className="fas fa-ban"></i> Cancel 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IncreaseIngredientModal;
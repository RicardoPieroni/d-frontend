import React, { Component } from 'react';
import Info from '../../info';
import $ from 'jquery';

import './food-menu.css';

class FoodMenu extends Component {

    constructor(){
        super();
        this.prepareIngredientsToDisplay = this._prepareIngredientsToDisplay.bind(this);
        this.onCheckBoxSnackChanged = this._onCheckBoxSnackChanged.bind(this);
        this.snackRequestList = [];
    }

    _prepareIngredientsToDisplay(data) {
        return data.map((item) => item.name).join(", ");
    }

    _onCheckBoxSnackChanged(e) {
        const callback = this.props.onCheckBoxSnackChanged;
        if (callback) {
            callback(e);
        }
    }

    render() {
        const { snackList } = this.props;
        return(
            <div className="grid-100">
                <div className="grid-100">
                    {
                        snackList && snackList.map((snack, index) => (
                            
                            <div className="grid-100" key={snack._id}>
                                <div className="grid-30 grid-center">
                                    <input type="checkbox" key={snack._id}
                                        ref={c => this.checkBoxSnack = c} 
                                        onChange={(e) => this.onCheckBoxSnackChanged(e)}
                                        name={`checkbox-${snack._id}`}
                                         value={snack._id}
                                    />
                                    <label >{snack.name}</label>
                                </div>
                                <div className="grid-20 grid-center">
                                    <label className="label-price">{ 'R$ ' + snack.price.toFixed(2)}</label>
                                </div>
                                <div className="grid-20">
                                    <Info keyComponent={snack._id} tagTitle="Ingredientes" modalTitle="Ingredientes"
                                    iconSizeClass="fa-2x" classReference={snack._id}
                                    description={this.prepareIngredientsToDisplay(snack.ingredients)}/>
                                </div>
                                <div className="grid-30">
                                    <input type="number" placeholder="Quantidade"
                                        onChange={(e) => this.props.onAmountChanged(e)}
                                        name={`amout-${snack._id}`} id={`amout-${snack._id}`}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="grid-100">
                    <div className="grid-50">
                        <button className="btn" onClick={() => this.props.onAddRequest()}> 
                            <i className="fas fa-check-square"></i> Adicionar
                        </button>
                    </div>
                   
                </div>
            </div>
        );
    }
}

export default FoodMenu;
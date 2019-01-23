import React, { Component } from 'react';
import Info from '../../info';
import $ from 'jquery';

import './food-menu.css';

class FoodMenu extends Component {

    constructor(){
        super();
        this.prepareIngredientsToDisplay = this._prepareIngredientsToDisplay.bind(this);
        this.foodRequestList = [];
    }

    _prepareIngredientsToDisplay(data) {
        return data.map((item) => `${item.name} (${item.amount})`).join(", ");
    }

    render() {
        const { foodList } = this.props;
        return(
            <div className="grid-100">
                <div className="grid-100">
                    {
                        foodList && foodList.map((food, index) => (
                            
                            <div className="grid-100" key={food._id}>
                                <div className="grid-30 grid-center">
                                    <label >{food.name}</label>
                                </div>
                                <div className="grid-20 grid-center">
                                    <label className="label-price">{ 'R$ ' + food.price.toFixed(2)}</label>
                                </div>
                                <div className="grid-20">
                                    <Info keyComponent={food._id} tagTitle="Ingredientes" modalTitle="Ingredientes"
                                    iconSizeClass="fa-2x" classReference={food._id}
                                    description={this.prepareIngredientsToDisplay(food.ingredients)}/>
                                </div>
                                <div className="grid-30">
                                    <input type="number" placeholder="Quantidade"
                                        onChange={(e) => this.props.onAmountChanged(e)}
                                        name={`amout-${food._id}`} id={`amout-${food._id}`}
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
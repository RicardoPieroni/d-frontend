import React, { Component } from 'react';
import $ from 'jquery';
import TabHeader from './tab-header';
import NavFoodRequest from './nav-food-request';
import IncreaseIngredientModal from './increase-ingredient-modal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveIngredientList, retrieveSnackList } from './../../actions';

import './food-request.css';

class FoodRequest extends Component {

    constructor() {
        super();
        this.onToggleMenu = this._onToggleMenu.bind(this);
    }

    _onToggleMenu() {
        $('#toggle-menu').toggleClass('arrow-up-menu');
        $('.box-menu').slideToggle('active');
    }

    componentWillMount() {
        this.props.retrieveIngredientList();
        this.props.retrieveSnackList();
    }

    render(){
        const { ingredientList, snackList } = this.props;
        return (
            <div className="grid-parent grid-container food-request-container">
                <TabHeader />
                <div className="grid-parent grid-100 food-request-form-wrapper">
                    <div className="grid-50">
                        <NavFoodRequest text= "Cardápio" onClicked={ this.onToggleMenu}/>
                        <div className="grid-100 box-menu">
                            <div className="grid-100">
                                    {
                                       snackList && snackList.map((snack, index) => (
                                           <div className="grid-100">
                                                <div className="grid-50">
                                                    <input type="checkbox" key={index} 
                                                        name={`checkbox-${snack._id}`} value={snack._id}
                                                    />
                                                    <label >{snack.name}</label>
                                                </div>
                                                <div className="grid-50">
                                                    <input type="number" placeholder="Quantidade"
                                                        name={`amout-${snack._id}`}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="food-request-table-container">
                     
                </div>
                <IncreaseIngredientModal ingredientList={ingredientList}/>
            </div>
        );
    }
}
const mapStateToProps = store => ({
    ingredientList: store.FoodRequest.ingredientList,
    snackList: store.FoodRequest.snackList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ retrieveIngredientList, retrieveSnackList }, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(FoodRequest);
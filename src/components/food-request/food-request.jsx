import React, { Component } from 'react';
import $ from 'jquery';
import TabHeader from '../tab-header';
import NavFoodRequest from './nav-food-request';
import IncreaseIngredientModal from './increase-ingredient-modal';
import FoodMenu from './food-menu';
import FoodRequestDataTable from './food-request-data-table';
import RemoveFoodModal from './remove-food-modal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    retrieveIngredientList,
    retrieveFoodList,
    retrieveFoodRequestDetails,
    addFoodOnRequestList,
    removeFoodFromRequestList,
    addRequestListInToRequest,
    addIngredientInToFood,
    addReferencedFood,
    updateIngredientsFromRequest,
    removeFoodFromRequest,
    createRequest
} from './../../actions';

import './food-request.css';

class FoodRequest extends Component {

    constructor(props) {
        super(props);
        this.onIncreaseIngredients = this._onIncreaseIngredients.bind(this);
        this.onToggleMenu = this._onToggleMenu.bind(this);
        this.onAmountChanged = this._onAmountChanged.bind(this);
        this.onAddRequest = this._onAddRequest.bind(this);
        this.onAmountIncreaseModalChanged = this._onAmountIncreaseModalChanged.bind(this);
        this.onConfirmAddIngredients = this._onConfirmAddIngredients.bind(this);
        this.onRemoveFood = this._onRemoveFood.bind(this);
        this.onConfirmRemoveFodd = this._onConfirmRemoveFodd.bind(this);
        this.onConfirmSendRequest = this._onConfirmSendRequest.bind(this);
    }

    _onToggleMenu() {
        $('#toggle-menu').toggleClass('arrow-up-menu');
        $('.box-menu').slideToggle('active');
    }

    componentWillMount() {
        this.props.retrieveFoodRequestDetails();
    }

    _onAmountChanged(e) {
        const id = e.target.id.substring(6);
        const amount = e.target.value;
        const dataTO = {
            _id: id,
            amount: e.target.value,
        }
        if (amount >= 1) {
            this.props.addFoodOnRequestList(this.props.requestList, dataTO)
        } else if (amount === ''){
            this.props.removeFoodFromRequestList(this.props.removeFoodFromRequestList, dataTO);
        }
    }

    _onAddRequest() {
        const requestList = this.props.requestList;
        this.props.addRequestListInToRequest(requestList);
    }

    _onIncreaseIngredients(data) {
        $('body').addClass('modal-opened');
        $('.modal-increase-ingredient').addClass('modal-visible');
        this.props.addReferencedFood(data);
    }

    _onRemoveFood(data) {
        $('body').addClass('modal-opened');
        $('.modal-remove-food').addClass('modal-visible');
        this.props.addReferencedFood(data);
    }

    _onConfirmRemoveFodd() {
        $('body').removeClass('modal-opened');
        $('.modal-remove-food').removeClass('modal-visible');
        this.props.removeFoodFromRequest(this.props.request, this.props.referencedFood);
    }

    _onAmountIncreaseModalChanged(e) {
        const id = e.target.id.substring(6);
        const amount = e.target.value;
        const dataTO = {
            _id: id,
            amount,
        }
        if (amount >= 1) {
            this.props.addIngredientInToFood(this.props.ingredientsToAdd, dataTO);
        }
    }

    _onConfirmAddIngredients() {
        $('body').removeClass('modal-opened');
        $('.modal-increase-ingredient').removeClass('modal-visible');
        this.props.updateIngredientsFromRequest(this.props.ingredientsToAdd, this.props.referencedFood, this.props.request);
    }

    _onConfirmSendRequest() {
        this.props.createRequest(this.props.request);
    }

    render(){
        const { ingredientList, foodList, requestList, request } = this.props;
        return (
            <div className="grid-parent grid-container food-request-container">
                <TabHeader iconClassName='fas fa-list-alt fa-5x'
                    title="Novo Pedido" 
                    iconTitle="Meus Pedidos"
                    link="/food-request/list"
                />
                <div className="grid-parent grid-100 food-request-form-wrapper">
                    <div className="grid-50">
                        <NavFoodRequest text= "Cardápio" onClicked={ this.onToggleMenu}/>
                        <div className="grid-100 box-menu">
                            <FoodMenu foodList={foodList}
                            onAmountChanged={this.onAmountChanged}
                            onAddRequest={this.onAddRequest}
                            requestList={requestList}
                            />
                        </div>
                    </div>
                    <div className="grid-50">
                        <FoodRequestDataTable request={request}
                            onIncreaseIngredients={this.onIncreaseIngredients}
                            onRemoveFood={ this.onRemoveFood}
                        />
                        <button className="btn-send-request" onClick={this.onConfirmSendRequest}>
                            <i className="fas fa-share-square"></i>Enviar Pedido
                        </button>
                    </div>
                </div>
                <IncreaseIngredientModal ingredientList={ingredientList}
                    onConfirmAddIngredients={this.onConfirmAddIngredients}
                    onAmountIncreaseModalChanged={this.onAmountIncreaseModalChanged}
                />
                <RemoveFoodModal onConfirmRemoveFodd={this.onConfirmRemoveFodd}/>
            </div>
        );
    }
}
const mapStateToProps = store => ({
    ingredientList: store.FoodRequest.ingredientList,
    foodList: store.FoodRequest.foodList,
    request: store.FoodRequest.request,
    requestList: store.FoodRequest.requestList,
    ingredientsToAdd: store.FoodRequest.ingredientsToAdd,
    referencedFood: store.FoodRequest.referencedFood,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ retrieveIngredientList,
    retrieveFoodList,
    retrieveFoodRequestDetails,
    addFoodOnRequestList,
    removeFoodFromRequestList,
    addRequestListInToRequest,
    addIngredientInToFood,
    addReferencedFood,
    updateIngredientsFromRequest,
    removeFoodFromRequest,
    createRequest
 }, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(FoodRequest);
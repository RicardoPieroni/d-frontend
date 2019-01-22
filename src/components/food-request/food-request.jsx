import React, { Component } from 'react';
import $ from 'jquery';
import TabHeader from './tab-header';
import NavFoodRequest from './nav-food-request';
import IncreaseIngredientModal from './increase-ingredient-modal';
import FoodMenu from './food-menu';
import FoodRequestDataTable from './food-request-data-table';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    retrieveIngredientList,
    retrieveSnackList,
    retrieveFoodRequestDetails,
    addSnackOnRequestList,
    removeSnackFromRequestList,
    addRequestListInToRequest
} from './../../actions';

import './food-request.css';

class FoodRequest extends Component {

    constructor(props) {
        super(props);
        this.onToggleMenu = this._onToggleMenu.bind(this);
        this.onCheckBoxSnackChanged = this._onCheckBoxSnackChanged.bind(this);
        this.onAmountChanged = this._onAmountChanged.bind(this);
        this.onAddRequest = this._onAddRequest.bind(this);
    }

    _onToggleMenu() {
        $('#toggle-menu').toggleClass('arrow-up-menu');
        $('.box-menu').slideToggle('active');
    }

    componentWillMount() {
        this.props.retrieveFoodRequestDetails();
    }

    _onCheckBoxSnackChanged(e) {
        const checked = e.target.checked;
        const dataTO = {
            _id: e.target.value,
        }
        if (checked) {
            this.props.addSnackOnRequestList(this.props.requestList, dataTO);
        } else {
            this.props.removeSnackFromRequestList(this.props.requestList, dataTO);
        }
    }

    _onAmountChanged(e) {
        const id = e.target.id.substring(6);
        const dataTO = {
            _id: id,
            amount: e.target.value,
        }
        this.props.addSnackOnRequestList(this.props.requestList, dataTO)
    }

    _onAddRequest() {
        const requestList = this.props.requestList;
        this.props.addRequestListInToRequest(requestList);
    }

    render(){
        const { ingredientList, snackList, requestList, request } = this.props;
        return (
            <div className="grid-parent grid-container food-request-container">
                <TabHeader />
                <div className="grid-parent grid-100 food-request-form-wrapper">
                    <div className="grid-50">
                        <NavFoodRequest text= "Cardápio" onClicked={ this.onToggleMenu}/>
                        <div className="grid-100 box-menu">
                            <FoodMenu snackList={snackList}
                            onCheckBoxSnackChanged={this.onCheckBoxSnackChanged}
                            onAmountChanged={this.onAmountChanged}
                            onAddRequest={this.onAddRequest}
                            requestList={requestList}
                            />
                        </div>
                    </div>
                    <div className="grid-50">
                        <FoodRequestDataTable request={request}/>
                        <button className="btn-send-request">
                        <i className="fas fa-share-square"></i>Enviar Pedido
                        </button>
                    </div>
                </div>
                <IncreaseIngredientModal ingredientList={ingredientList}/>
            </div>
        );
    }
}
const mapStateToProps = store => ({
    ingredientList: store.FoodRequest.ingredientList,
    snackList: store.FoodRequest.snackList,
    request: store.FoodRequest.request,
    requestList: store.FoodRequest.requestList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ retrieveIngredientList,
    retrieveSnackList,
    retrieveFoodRequestDetails,
    addSnackOnRequestList,
    removeSnackFromRequestList,
    addRequestListInToRequest
 }, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(FoodRequest);
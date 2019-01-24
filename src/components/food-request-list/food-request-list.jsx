import React, { Component } from 'react';
import moment from 'moment';
import $ from 'jquery';

import TabHeader from '../tab-header';
import FoodRequestListCancelModal from './food-request-list-cancel-modal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    retrieveAllRequests,
    setReferencedRequest,
    updateStatusOfRequest
   
} from './../../actions';

import './food-request-list.css';

class FoodRequestList extends Component {

    constructor(){
        super();
        this.onCancelRequestClicked = this._onCancelRequestClicked.bind(this);
        this.onConfirmRequestCancel = this._onConfirmRequestCancel.bind(this);
    }

    componentWillMount() {
        this.props.retrieveAllRequests();
    }

    _onCancelRequestClicked(data) {
        $('body').addClass('modal-opened');
        $('.modal-food-request-list-cancel').addClass('modal-visible');
        this.props.setReferencedRequest(data);
    }

    _onConfirmRequestCancel() {
        this.props.updateStatusOfRequest(this.props.referencedRequest);
    }

    render() {
        const { requests } = this.props;
        return (
            <div className="grid-parent grid-container">
                <TabHeader iconClassName="fas fa-cart-plus fa-5x"
                iconTitle="Novo Pedido"
                title="Meus Pedidos"
                link="/food-request/new"
                />
                <div className="grid-100">
                    <table className="request-table table-list">
                        <thead>
                            <tr>
                                <th>Número</th>
                                <th>Data Pedido</th>
                                <th>Conteúdo</th>
                                <th>Valor</th>
                                <th>Status</th>
                                <th>Cancelar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                requests && requests.map((request) => (
                                    <tr key={request._id}>
                                        <td>{request.number}</td>
                                        <td>{ moment(request.requestDate).format('DD/MM/YYYY')}</td>
                                        <td>
                                            <div className="food-list-content">
                                                <ul>
                                                    {
                                                        request.requestList.map((food) => (
                                                            <li key={food._id}>{ `${food.name} R$ ${food.price} (${food.amount})` }</li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </td>
                                        <td>
                                            { `R$ ${request.price}`}
                                        </td>
                                        <td>
                                            { request.status }
                                        </td>
                                        <td>
                                            <i className="fas fa-ban" title="Cancelar Pedido" onClick={() => this.onCancelRequestClicked(request)}/>
                                        </td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>
                <FoodRequestListCancelModal onConfirmRequestCancel ={this.onConfirmRequestCancel}/>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    requests: store.FoodRequestList.requests,
    referencedRequest: store.FoodRequestList.referencedRequest,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    retrieveAllRequests,
    setReferencedRequest,
    updateStatusOfRequest
 }, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(FoodRequestList);
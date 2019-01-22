import React, { Component} from 'react';
import Info from '../../info';

import './food-request-data-table.css';

class FoodRequestDataTable extends Component {

    constructor() {
        super();
        this.prepareIngredientsToDisplay = this._prepareIngredientsToDisplay.bind(this);
    }

    _prepareIngredientsToDisplay(data) {
        return data.map((item) => item.name).join(", ");
    }

    render() {
        const { request } = this.props;
        return (
            <div className="grid-100 food-request-table-container">
                        <div className="grid-100 request-food-wrapper" >
                            <div className="grid-50">
                                <label className="request-food-content" >
                                    Seu Pedido
                                </label>
                            </div>
                        </div>
                        <table className="request-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Ingredientes</th>
                                    <th>Valor</th>
                                    <th colSpan="2">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    request && request.requestList.map((item) => 
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>
                                            <Info keyComponent={item._id} tagTitle="Ingredientes" modalTitle="Ingredientes"
                                            iconSizeClass="fa-2x" classReference={item._id}
                                            description={this.prepareIngredientsToDisplay(item.ingredients)}/>
                                            </td>
                                            <td>{ item.price }</td>
                                            <td>
                                                <i className="fas fa-plus-square"></i>
                                                <i className="fas fa-trash-alt"></i>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th> Total: { request ? request.price : 0.00 }</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
        );
    }
}

export default FoodRequestDataTable;
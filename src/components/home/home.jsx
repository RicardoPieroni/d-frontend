import React from 'react';
import { Link } from 'react-router-dom';

import './home.css';

const Home = () => (
    <div className="grid-parent grid-container home-container">
        <div className="grid-100 menu-container">
            <div className="grid-50">
                <Link to="/food-request/new" className="link-menu-container" title="Novo pedido">
                    <i className="fas fa-cart-plus fa-5x"></i>
                </Link>
            </div>
            <div className="grid-50">
                <Link to="/food-request/list" className="link-menu-container" title="Meus Pedidos">
                    <i className="fas fa-list-alt fa-5x"></i>
                </Link>
            </div>
        </div>
    </div>
);

export default Home;
import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = () => (
    <header>
        <div className="grid-container grid-parent header-container">
                <div className="application-name-header grid-70">
                        <Link to="/" >
                                Dextra Pedidos
                        </Link>
                </div>
        </div>
    </header>
);

export default Header;
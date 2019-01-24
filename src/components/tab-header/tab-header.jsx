import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './tab-header.css';

class TabHeader extends Component {

    static defaultProps = {
        iconTitle: '',
        iconClassName: '',
        link: '/',
        title: ''
    }

    render() {
    
        return (
            <div className="grid-100 tab-header">
                <div className="grid-30">
                    <Link to={this.props.link} className="link-menu-container">
                        <i title={this.props.iconTitle}
                           className={this.props.iconClassName} 
                        />
                    </Link>
                </div>
                <div className="grid-30 tab-header-title">
                    <h3>{this.props.title}</h3>
                </div>
            </div>
        )
    }
};


export default TabHeader;
import React from 'react';
import ReactDOM from 'react-dom';
import Component from './remove-food-modal';

it('renders the component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Component />, div);
  ReactDOM.unmountComponentAtNode(div);
});

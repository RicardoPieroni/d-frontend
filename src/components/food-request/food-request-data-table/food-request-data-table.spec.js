import React from 'react';
import ReactDOM from 'react-dom';
import Component from './food-request-data-table';

it('renders the component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Component />, div);
  ReactDOM.unmountComponentAtNode(div);
});

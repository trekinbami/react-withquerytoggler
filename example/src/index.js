import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './index.css';
import App from './App/App';

const RoutedApp = () => (
  <BrowserRouter>
    <Route path='/' component={App} />
  </BrowserRouter>
);

ReactDOM.render(<RoutedApp />, document.getElementById('root'));

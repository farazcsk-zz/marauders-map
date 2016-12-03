import React from 'react';
import { Route } from 'react-router';
import Login from '../components/Login';
import App from '../containers/app';

export default (
  <div>
    <Route path="/" component={ Login } />
    <Route path="/mischief/:name" component={ App } />
  </div>
);

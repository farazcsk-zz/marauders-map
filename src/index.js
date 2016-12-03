import 'es5-shim';
import 'es6-shim';
import 'es6-promise';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppBar } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './store/routes';
import configureStore from './store/configure-store';

// Global styles
import './styles/index.css';

import WatsonSpeech from 'watson-speech';
window.WatsonSpeech = WatsonSpeech;
import jquery from 'jquery';
window.$ = jquery;

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);

injectTapEventPlugin();

ReactDOM.render(
  <div>
    <MuiThemeProvider>
      <AppBar
        showMenuIconButton={false}
      />
    </MuiThemeProvider>
    <Provider store={ store }>
      <Router history={ history }>
        { routes }
      </Router>
    </Provider>
  </div>,
  document.getElementById('root')
);

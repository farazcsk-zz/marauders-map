import React from 'react';
import { RaisedButton } from 'material-ui';
import { browserHistory } from 'react-router';
import { getTextFromMic, checkForCorrectPassword, say } from './../utils/speech.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <RaisedButton
          label="I solemnly swear that I am up to no good"
          onClick={() => {
            getTextFromMic('password');
            checkForCorrectPassword('password', () => {
              browserHistory.push('/mischief');
            });
          }}
        />
        </MuiThemeProvider>
        <p id="password">hi</p>
      </div>
    );
  }
}


export default Login;

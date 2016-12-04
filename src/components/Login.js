import React from 'react';
import { RaisedButton, TextField } from 'material-ui';
import { browserHistory } from 'react-router';
import { getTextFromMic, checkForCorrectPassword, checkForCorrectGoodbye } from './../utils/speech.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      reveal: false,
    };
    this.showReveal = this.showReveal.bind(this);
  }

  showReveal() {
    this.setState({
      ...this.state,
      reveal: true,
    });
  }

  render() {
    const form = (
      <div>
        <TextField
          id="Username"
          placeholder="Enter messr name"
          onChange={(e) =>{
            this.setState({
              ...this.state,
              username: e.target.value,
            });
          }}
        />
        <br />
        <RaisedButton
          label="Enter"
          onClick={() =>{
            this.showReveal();
          }}
        />
      </div>
    );
    return (
      <div>
        <MuiThemeProvider>
          {this.state.reveal ? <RaisedButton
          label="Reveal..."
          onClick={() => {
            getTextFromMic('password');
            checkForCorrectPassword('password', this.state.username, () => {
              browserHistory.push(`/mischief/${this.state.username}`);
            });
          }}
        /> : form }
        </MuiThemeProvider>
        <p id="password"></p>
      </div>
    );
  }
}


export default Login;

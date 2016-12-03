import React from 'react';
import { connect } from 'react-redux';

import MapView from '../components/MapView';

function mapStateToProps(/* state */) {
  return {
    // TODO: Add state to be mapped to props
  };
}

function mapDispatchToProps(/* dispatch */) {
  return {
    // TODO: Add actions to be mapped to props
  };
}

class App extends React.Component {
  componentDidMount() {
    this.pubNub = new PubNub({
      publishKey: 'pub-c-260e570c-07b0-4988-805c-1c6e0014407d',
      subscribeKey: 'sub-c-07c504da-b962-11e6-b490-02ee2ddab7fe',
    });
    this.pubNub.addListener({
      status: (statusEvent) => {
        console.log(statusEvent);
      },
      message: (message) => {
        if (message.message.action === 'UPDATED_LOCATION') {
          // get all users
          getAllUserState(function(users) {
            // update map with said users
            updateMapFunction(users);
          });
        } else {
          // some other shit.
          console.log(message);
        }
      },
      presence: (presenceEvent) => {
          // handle presence
        console.log(presenceEvent);
      },
    });
    // Subscribing to secure channel
    this.pubNub.subscribe({
      channels: ['secure'],
    });
  }
  render() {
    return (
      <MapView />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

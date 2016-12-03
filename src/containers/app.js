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

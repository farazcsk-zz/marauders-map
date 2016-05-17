import React from 'react';
import { connect } from 'react-redux';

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
      <div>
        <h1>Hello World!</h1>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

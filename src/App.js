import React, { Component } from "react";
import Alert from "react-s-alert";

import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <>
        <Routes />
        <Alert stack={{ limit: 3 }} />
      </>
    );
  }
}

export default App;

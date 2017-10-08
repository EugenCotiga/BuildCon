import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import HeaderBreadcrumb from './common/components/HeaderBreadcrumb';
import Header from './common/components/Header'
import Main from './common/components/Main';

class App extends Component {

  render() {
    return (
        <div className="container-fluid">
            <Header />
            <Main />
        </div>
    );
  }
}

export default App;

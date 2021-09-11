import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/cover.css'
import './App.css';
import InputPro from './components/InputPro';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Product from './components/Product';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


class App extends Component {

  state = {
    product:{}
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/"><InputPro getProduct={product => this.setState({product:product})}></InputPro></Route>
            <Route exact path="/Product" ><Product product={this.state.product}></Product></Route>
            <Route exact path="/Products" ><Products getProduct={product => this.setState({product:product})}></Products></Route>
          </Switch>
          <Footer />
        </Router>
      </div>


    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Movies from './components/movies/Movies';
import AddMovie from './components/movies/AddMovie';
import EditMovie from './components/movies/EditMovie';
import Header from './components/layout/Header';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

import { Provider } from "react-redux";
import store from "./store";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header branding="Movie Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Movies} />
                <Route exact path="/movie/add" component={AddMovie} />
                <Route exact path="/movie/edit/:id" component={EditMovie} />
                <Route exact path="/about" component={About} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

import React, { Component, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import User from "./components/users/User";
import SingleUser from "./components/users/SingleUser";
import About from "./components/pages/About";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layouts/Alert";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  searchUsers = text => {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then(res =>
        this.setState({
          users: res.data.items,
          loading: false
        })
      );
  };

  getUser = (username) => {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then(res =>
        this.setState({
          user: res.data,
          loading: false
        })
        );
    };
    
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    });
  };
  
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };
  
  render() {
    console.log(this.state.users);
    
    return (
      <Router>
        <div>
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <User
                      loading={this.state.loading}
                      users={this.state.users}
                    />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <SingleUser
                    {...props}
                    getUser={this.getUser}
                    singleUser={this.state.user}
                    loading={this.state.loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

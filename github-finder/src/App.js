import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import User from "./components/users/User";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layouts/Alert";

class App extends Component {
  state = {
    users: [],
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

  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    });
  };

  setAlert = (msg, type) => {
    this.setState({alert: {msg: msg, type: type}})
    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={this.state.users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <User loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;

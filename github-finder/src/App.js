import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import User from "./components/users/User";
import axios from "axios";
import Search from "./components/users/Search";

class App extends Component {
  state = {
    users: [],
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    
    axios
      .get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then(res =>
        this.setState({
          users: res.data,
          loading: false
        })
      );
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Search />
          <User loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;

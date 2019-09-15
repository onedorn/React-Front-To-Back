import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import User from "./components/users/User";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });

    axios.get("https://api.github.com/users").then(res =>
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
          <User loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;

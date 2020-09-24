import "./App.css";
import Containerlayout from "./components/Containerlayout";
import data from "./data/data.json";
import Formtest from "./components/Formtest";
import React, { Component } from "react";
import Createform from "./components/Createform";
import Appbar from "./components/Appbar";
import Viewtool from "./components/test/Viewtool";
import Container from "@material-ui/core/Container";
import Edittool from "./components/test/Edittool";
import Gridlayout from "./components/Gridlayout";
import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      selectedTool: {},
      user: "sh267@hdm-stuttgart.de",
      signedIn: false,
      searchString: "",
    };
    this.setSelectedTool = this.setSelectedTool.bind(this);
    this.searchForKeyWord = this.searchForKeyWord.bind(this);
  }

  setSelectedTool(selectedTool) {
    console.log(selectedTool);
    this.setState({ selectedTool: selectedTool });
  }

  searchForKeyWord = (searchString) => {
    this.setState({ searchString: searchString });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Appbar
            user={this.state.user}
            searchForKeyWord={this.searchForKeyWord}
          ></Appbar>
          <Switch>
            <Route path="/" exact>
              <Gridlayout
                user={this.state.user}
                data={this.state.data}
                setSelectedTool={this.setSelectedTool}
                searchString={this.state.searchString}
                searchForKeyWord={this.searchForKeyWord}
              ></Gridlayout>
            </Route>
            <Route path="/create">
              <Edittool mode="create"></Edittool>
            </Route>

            <Route
              path="/edit/:name"
              render={(props) => <Edittool {...props} user={this.state.user} />}
            />
            <Route
              path="/:name"
              render={(props) => <Viewtool {...props} user={this.state.user} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

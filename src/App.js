import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Admin from "./components/Admin/Admin/Admin";
import Distribution from "./components/Distribution/Distribution";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Distribution />
          </Route>
          <Route path="/home">
            <Distribution />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

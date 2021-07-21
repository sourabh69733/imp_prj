import React from 'react';
import './styles.css';
import WeeksComponent  from './components/weeks.component';

import DashboardInput from "./components/Inputdashboard.js";
import LessonsPlayer  from './components/vedioPlayer';
import DashboardLessons from "./components/dashboardLessons";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from "react-router-dom";

function App() {

  return (
    <div>
      <br />

      <Router>
        <div>
          <ul>
            <li>
              <Link to="/" >Back</Link>
            </li>
            <li>
              <Link to="/weeks">Weeks</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/" component={DashboardInput} />
          <Route path="/weeks" component={WeeksComponent} />
          <Route path="/dashboard" component={DashboardLessons} />
          <Route exact path="/:id" component={LessonsPlayer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

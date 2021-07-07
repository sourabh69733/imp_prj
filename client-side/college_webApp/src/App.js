import React from 'react';
import './styles.css';
import WeeksComponent  from './components/weeks.component';

import DashboardInput from "./components/dashboard";
import LessonsPlayer  from './components/vedioPlayer';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  
  return (
    <div>
      <br/>
      <Router>
        <Route path="/" component={DashboardInput} />
        <Route exact path="/weeks/" component={WeeksComponent}/>
        <Route exact path="/:id" component={LessonsPlayer}/>
      </Router>
    </div>
  );
}

export default App;

/**
 *<ul>
    {lessonIdArr.map((id) => {
      console.log(id, "/" + id);
      return (
        <li key={id}>
          <Link to={"/" + id} id={id} component={LessonsPlayer} />
        </li>
      );
    })}
  </ul>
 */
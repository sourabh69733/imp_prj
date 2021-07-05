import React from 'react';
import './styles.css';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import WeeksComponent  from './components/weeks.component';
import { ReadMoreButtton } from "./components/smallFunction";
import DashboardInput from "./components/dashboard";
import Assignments from './components/assignment';
import Navbar from './components/navbar.component';
import LessonsPlayer  from './components/vedioPlayer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

function App() {
  const hidenContent =(
    <h5>
      It is working. 
    </h5>
  )
  const lessonIdArr = ["60dbffa46219d31f38445095"];
  return (
    <div>
      <WeeksComponent />
      {/* <Navbar /> */}
      <br/>
      <Router>
        
        <Route path="/:id" component={LessonsPlayer}/>
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
import React from 'react';
import './styles.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import  AssignmentComponent from "./components/assignment";
import WeeksComponent  from './components/weeks.component';
import { ReadMoreButtton } from "./components/smallFunction";
import DashboardData from "./components/dashboard";


function App() {
  const hidenContent =(
    <p>
      It is working. 
    </p>
  )
    
  return (
    <div>
      <WeeksComponent />
      <ReadMoreButtton hiddenContent={hidenContent} />
      <div id="question">
        <label id="question" name="question" htmlFor="question">
          <DashboardData id="question" />
        </label>
      </div>
    </div>
  );
}

export default App;


import React from 'react';
import './styles.css';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import WeeksComponent  from './components/weeks.component';
import { ReadMoreButtton } from "./components/smallFunction";
import DashboardData from "./components/dashboard";


function App() {
  const hidenContent =(
    <h5>
      It is working. 
    </h5>
  )
    
  return (
    <div>
      <WeeksComponent />
      {/* <ReadMoreButtton hiddenContent={hidenContent} /> */}
      {/* <div id="questions">         */}
          {/* <DashboardData id="question" /> */}
      {/* </div> */}
    </div>
  );
}

export default App;


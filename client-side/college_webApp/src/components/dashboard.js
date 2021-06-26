/**
 * It is act like data source for our page. through it user can input number of weeks and lesssons of week and vedio link of each of them. It is also
 * All data collected data make website more dynamic. It is act like graded assignment and has features of add question, options and answer
 * button to check question, we also store it.
 */
import React from 'react';
import { AddMoreButton } from "./smallFunction";

export default function DashboardData(props) {


    return (
      <div>
        <div id="questions">
          <AddMoreButton lableName={["Question 1"]} id="question1" />
        </div>

      </div>
    );
    
}
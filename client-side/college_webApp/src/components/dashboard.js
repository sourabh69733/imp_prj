/**
 * It is act like data source for our page. through it user can input number of weeks and lesssons of week and vedio link of each of them. It is also
 * All data collected data make website more dynamic. It is act like graded assignment and has features of add question, options and answer
 * button to check question, we also store it.
 */
import React, {Component} from 'react';
import { AddMoreButton } from "./smallFunction";

function DashboardHelper(props) {


    return (
      <div>
        <h5>Helper Component</h5>
      </div>
    );
    
}

export default class DashboardInput extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validator = this.validator.bind(this);
    this.state = {
      courses:[],
      courseName:'',
      weeks: [],      //  format dict of  key --wk1_ls1, value --wk1_ls1 (Array type)
      questions: [],  //  format dict of key --questionId, value --question (String Type)
      options: [],  //  format dict of key --questionId, value --options (array of strings )
      answers: [],    //  format dict of key --questionId, value --answer (String Type)
    };

    this.validator= (e) => {
      return true;

    }
    this.handleSubmit= (e) =>{

    }

    return {
      render() {
        <div>
          <div>
            <label htmlFor="course_name" name="course_name" id="course_name">
            Course name
              <input type="text" name="course_name" id="course_name" 
              value={this.state.courseName} onChange={(e) => {
                this.setState({courseName:e.target.value})
                this.state.courses.push(this.state.courseName)
                }
                } />
            </label>
            {
              this.state.courses.map((course) => {
                return (
                  <div>
                    <label name="course">
                      <select >
                        <option value={course}/>
                      </select>                      
                
                    </label>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    }
  }
} 
/**
 * It is act like data source for our page. through it user can input number of weeks and lesssons of week and vedio link of each of them. It is also
 * All data collected data make website more dynamic. It is act like graded assignment and has features of add question, options and answer
 * button to check question, we also store it.
 */


import React, {Component} from 'react';
import axios from 'axios';

// import { AddMoreButton } from "./smallFunction";
function constructIds(name, type) {
  if (type==="course"){
    if (name.contains("maths"))
    return "math101"
    if (name.contains("statistics"))
    return "stats101"
    if (name.contains("python"))
    return "python101"
    if (name.contains("english"))
    return "english101"
  }
  if (type==="lessons"){

  }
}

export default class DashboardInput extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validator = this.validator.bind(this);
    this.state = {
      courses: [],
      temp_options: [],
      clicked: false,
      courseName: [],
      courseButton: false,
      weekButton: false,
      lessonButton: false,
      weeks: [], //  format dict of  key --wk1_ls1, value --wk1_ls1 (Array type)
      lessonName: [],
      links: [], //  format dict of key --questionId, value --question (String Type)
      is_popup: [],
      description: [], //  format dict of key --questionId, value --options (array of strings )
      answers: [], //  format dict of key --questionId, value --answer (String Type)
    };
  };

  validator() {
    return true;
  }

  handleSubmit() {
    const values = document.getElementById("course_name").value;
    this.state.courses.push(values);
    const course_id = this.state.courseName
    if (this.state.courseButton){
      axios
      .post("http://localhost:8000/lessons/add",{
        courseId:this.state.courseName
      })
    }
    this.setState({
      courseName:'',
      courses: this.state.courses,
      clicked:true
    });
  };

  handleClick(e) {
    return (
      <div>
        <h5>handle click button pressed</h5>
      </div>
    );
  };

  

  render() {
    return (
      <div>
        <div>
          <label htmlFor="course_name" name="course_name" id="course_name">
            Course name
            <input
              type="text"
              name="course_name"
              id="course_name"
              value={this.state.courseName}
              onChange={(e) => {
                this.setState({ courseName: e.target.value });
              }}
            />
          </label>
          <label htmlFor="lesson_name" name="lesson_name" id="lesson_name">
            Lesson name
            <input
              type="text"
              name="lesson_name"
              id="lesson_name"
              value={this.state.lessonName}
              onChange={(e) => {
                this.setState({ lessonName: e.target.value });
              }}
            />
            <input
              type="number"
              name="lesson_name"
              id="lesson_number"
              onChange={(e) => this.state.lessonName+e.target.value}
            />
          </label>
          <label htmlFor="week_name" name="week_name" id="week_name">
            Week name
            <input
              type="text"
              name="week_name"
              id="week_name"
              value={this.state.weekName}
              onChange={(e) => {
                this.setState({ weekName: e.target.value });
              }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="lesson_link" name="lesson_link" id="lesson_link">
            <input
              placeholder="Please type your lesson video link"
              type="text"
              name="lesson_link"
              id="lesson_link"
              value={this.state.lessonLinks}
              onChange={(e) => {
                this.setState({ lessonLinks: e.target.value });
              }}
            />
          </label>
          <label htmlFor="description" name="description" id="description">
            <input
              placeholder="Please add description about lesson"
              type="text"
              name="description"
              id="description"
              value={this.state.description}
              onChange={(e) => {
                this.setState({ description: e.target.value });
              }}
            />
          </label>
          <label
            htmlFor="is_popup_lesson"
            name="is_popup_lesson"
            id="is_popup_lesson"
          >
            <input type="radio" value={true} name="is_popup_lesson" />
            <input type="radio" value={false} name="is_popup_lesson" />
          </label>
        </div>
        <div>
          <button
            type="submit"
            onClick={() => this.setState({ courseButton: true })}
            onSubmit={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  };
};

/**
 *           <button
            type="submit"
            value={this.state.weekButton}
            onClick={() => this.setState({ weekButton: true })}
          >
            Add More Weeks
          </button>
          <button
            type="submit"
            value={this.state.lesssonButton}
            onClick={() => this.setState({ lessonButton: true }) }
          >
            Add More lessons
          </button>
          <button
            type="submit"
            value={this.state.courseButton}
            onClick={() => this.setState({ courseButton: true })}
          >
            Add More Course
          </button>

 */
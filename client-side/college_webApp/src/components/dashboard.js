/**
 * Admin can input number of weeks and lesssons of week and vedio link of each of them. 
 * Focus to give more flexibility in adding
 */


import React, {Component} from 'react';
import axios from 'axios';
const root = require("./globalVar");

// import { AddMoreButton } from "./smallFunction";
function constructIds (name, type) {
  if (type==="course"){
    if (name.match("maths"))
    return "math101"
    if (name.match("statistics"))
    return "stats101"
    if (name.match("python"))
    return "python101"
    if (name.match("english"))
    return "english101"

    return "other101"
  }
}


class DashboardHelper extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      courseName: "",
      weekNumber: 0,
      weekName: "", //  format dict of  key --wk1_ls1, value --wk1_ls1 (Array type)
      lessonNumber: 0,
      lessonName: "",
    };
  }
  handleSubmit(e) {
    axios.post(root.root_lessons, {
      lessonId:
        "wk" +
        String(this.state.weekNumber) +
        "_ls" +
        String(this.state.lessonNumber),
      courseName: this.state.courseName,
      weekName: this.state.weekName,
      lessonName: this.state.lessonName,
    });
    return true;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label name="course_name" id="course_name_label">
            Course Name
            <input
              name="course_name"
              id="course_name_input"
              placeholder="Please Type Course name"
              value={this.state.courseName}
              onChange={(e) => {
                this.setState({
                  courseName: e.target.value,
                });
              }}
              required
            />
          </label>
          <label name="week" id="week">
            Week Number
            <input
              name="week"
              id="week_number"
              value={this.state.weekNumber}
              onChange={(e) => {
                this.setState({
                  weekNumber: e.target.value,
                });
              }}
              required
            />
            Week Name
            <input
              name="week"
              id="week_name"
              value={this.state.weekName}
              onChange={(e) => {
                this.setState({
                  weekName: e.target.value,
                });
              }}
              required
            />
          </label>
          <label name="lesson" id="lesson">
            Lesson Number
            <input
              name="lesson"
              id="lesson_number"
              value={this.state.lessonNumber}
              onChange={(e) => {
                this.setState({
                  lessonNumber: e.target.value,
                });
              }}
              required
            />
            Lesson Name
            <input
              name="lesson"
              id="lesson_name"
              value={this.state.lessonName}
              onChange={(e) => {
                this.setState({
                  lessonName: e.target.value,
                });
              }}
              required
            />
          </label>
        </form>
      </div>
    );
  }
}



export default class DashboardInput extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validator = this.validator.bind(this);
    this.state = {
      clicked: false,
      links: "", //  format dict of key --questionId, value --question (String Type)
      is_popup: false,
      description: "", //  format dict of key --questionId, value --options (array of strings )
      answers: "", //  format dict of key --questionId, value --answer (String Type)
    };
  };

  validator() {
    return true;
  }

  handleSubmit() {

      axios
        .post("http://localhost:8000/lessons/add", {
          lessonId:
            "wk" +
            String(this.state.weekNumber) +
            "_ls" +
            String(this.state.lessonNumber),
          courseName: this.state.courseName,
          weekName: this.state.weekName,
          lessonName: this.state.lessonName,
          links: this.state.links,
          is_popup: this.state.is_popup,
          description: this.state.description,
        })
        .then((res) => res.json({ msg: "succesfull add" }))
        .catch((err) => console.log(err));
      
  };

  handleClick(e) {
    return (
      <div>
        <h5>handle click button pressed</h5>
      </div>
    );
  };
// https://youtu.be/1l83L1ZKF5k
// https://www.youtube.com/embed/1l83L1ZKF5k

  render() {
    return (
      <div style={{ margin: "10px" }}>
        <form onSubmit={this.handleSubmit} action="/">
          <div style={{ margin: "20px", padding: "10px" }}>
            <DashboardHelper />
            
          </div>
          <div style={{ margin: "20px", padding: "20px" }}>
            <label htmlFor="lesson_link" name="lesson_link" id="lesson_link">
              <input
                placeholder="Please type your lesson video link"
                type="text"
                name="lesson_link"
                id="lesson_link"
                value={this.state.links}
                onChange={(e) => {
                  this.setState({ links: e.target.value });
                }}
                required
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
            <div style={{ margin: "20px", padding: "10px", display: "flex" }}>
              <label
                htmlFor="is_popup_lesson"
                name="is_popup_lesson"
                id="is_popup_lesson"
              >
                Do you want pop up in vedio?
                <label>
                  True
                  <input
                    type="radio"
                    value={this.state.is_popup}
                    name="is_popup_lesson"
                    onChange={() => {
                      this.setState({
                        is_popup: true,
                      });
                    }}
                  />
                </label>
                <label>
                  False
                  <input
                    type="radio"
                    value={this.state.is_popup}
                    name="is_popup_lesson"
                    onChange={() => {
                      this.setState({
                        is_popup: false,
                      });
                    }}
                  />
                </label>
              </label>
            </div>
          </div>
          <div>
            <button type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        </form>
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
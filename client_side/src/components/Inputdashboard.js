/**
 * Admin can input number of weeks and lesssons of week and vedio link of each of them. 
 * Focus to give more flexibility in adding
 */


import React, {Component} from 'react';
import axios from 'axios';
const root = require("./globalVar");

// import { AddMoreButton } from "./smallFunction";
/**
 * componentdidmount and componentwillmount --
 */

export default class DashboardInput extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validator = this.validator.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      courses: [["Mathematics"], ["Python"], ["Statistics"], ["English"]],
      courseMap: {
        Mathematics: "maths101",
        Python: "python101",
        Statistics: "stats101",
        English: "english101",
      },
      count: 0,
      weekNumber: 1,
      weekName: "intro",
      lessonId: "wk1_ls1",
      lessonName: "intro",
      lessonNumber: 1,
      links: "https://www.youtube.com/embed/1l83L1ZKF5k", //
      courseId: "Mathematics", // format courseName101
      is_popup: false, // bool
      description: "It is in test",
    };
  }
  /**
   * course, week number , week name, lesson number, lesson name, +6
   */
  componentDidMount() {
    axios
      .get(root.root_lessons+"admin/coursecount")
      .then((res) => {
        if (
          !res.data.courseLessonCount 
        )
          return false;
        if (
          !res.data.courseWeekCount 
        )
          return false;
        console.log(res.data, " this is not working")
        this.setState(() => {
          console.log(res.data)
          return {
            weekNumber: res.data.courseWeekCount,
            lessonNumber: res.data.courseLessonCount+1,
          };
        });
      })
      .catch((err) => console.log(err));
      document.getElementById('btn-submit').innerHTML.disabled= true;
      // console.log(this.state.weekNumber, this.state.lessonNumber)
  }

  validator() {
    const arr = [
      this.state.weekName,
      this.state.lessonId,
      this.state.lessonName,
      this.state.links,
      this.state.courseId,
    ];
    for (let i of arr) {
      if (i === "") {
        return false;
      }
    }
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.validator()) {
      alert("Please check your field ");
      return false;
    };

    axios
      .post(root.root_lessons + "add", {
        courseId: this.state.courseMap[this.state.courseId],
        lessonId: this.state.lessonId,
        weekName: this.state.weekName,
        weekNumber: this.state.weekNumber,
        lessonName: this.state.lessonName,
        lessonNumber: this.state.lessonNumber,
        links: this.state.links,
        is_popup: this.state.is_popup,
        description: this.state.description,
      })
      .then((res) => console.log(res.data.msg))
      .catch((err) => console.log(err));
  };

  handleClick() {
    this.setState((state) => {
      return {
        lessonId:
          "wk" +
          String(state.weekNumber) +
          "_ls" +
          String(state.lessonNumber),
      };
    });
  };

  handleNumberClick(e){
    if (e.target.value - this.state.weekNumber === 1) {
      return false;
    } else {
      this.setState((state) => {
        return {
          weekNumber: state.weekNumber + 1,
        };
      });
    };
  };

  // https://www.youtube.com/embed/me3_XR7Iz60

  render() {
    return (
      <div style={{ margin: "10px" }}>
        <form onSubmit={this.handleSubmit}>
          <div style={{ margin: "20px", padding: "10px" }}>
            <div id="courses">
              <select
                name="courses"
                id="courses"
                value={this.state.courseId}
                onChange={(e) => {
                  this.setState({
                    courseId: e.target.value,
                  });
                }}
              >
                {this.state.courses.map((item) => {
                  return (
                    <option name="courses" id={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <label
              htmlFor="week_number"
              name="week_number"
              id="week_number_label"
            >
              Week Number
              <input
                placeholder="Please type week Number"
                type="number"
                name="week_number"
                id="week_number"
                value={this.state.weekNumber}
                onClick= {this.handleNumberClick}
              />
            </label>

            <label htmlFor="week_name" name="week_name" id="week_label">
              <input
                placeholder="Please type your week name"
                type="text"
                name="week_name"
                id="week_name"
                value={this.state.weekName}
                onChange={(e) => {
                  this.setState({ weekName: e.target.value });
                }}
                required
              />
            </label>
            <label
              htmlFor="lesson_number"
              name="lesson_number"
              id="lesson_number_label"
            >
              Lesson Number
              <input
                placeholder="Please type your lesson Number"
                type="number"
                name="lesson_number"
                id="lesson_number"
                value={this.state.lessonNumber}
              />
            </label>

            <label
              htmlFor="lesson_name"
              name="lesson_name"
              id="lesson_name_label"
            >
              <input
                placeholder="Please type your lesson Name"
                type="text"
                name="lesson_name"
                id="lesson_name"
                value={this.state.lessonName}
                onChange={(e) => {
                  this.setState({ lessonName: e.target.value });
                }}
                required
              />
            </label>
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
                prompt?
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
            <button type="submit" id="submit-btn" onClick={this.handleClick}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
};

/**     https://www.youtube.com/embed/1l83L1ZKF5k

*/
/**
 * 
 */
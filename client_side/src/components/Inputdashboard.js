import React, {Component} from 'react';
import axios from 'axios';
import  Validator  from "./form_validator";
import { FormFieldsFunction } from "./form.component";

const root = require("./globalVar");


export default class DashboardInput extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
      weekNumber:2 ,
      weekName: "intro",
      lessonId: "wk1_ls1",
      lessonName: "intro",
      lessonNumber: 1,
      links: "https://www.youtube.com/embed/1l83L1ZKF5k", //
      courseId: "Mathematics", // format courseName101
      is_popup: false, // bool
      description: "It is in test",
    };

    this.forms_fields = FormFieldsFunction(this.state, this)
    this.state_array = [
      this.state.weekNumber,
      this.state.weekName,
      this.state.lessonNumber,
      this.state.lessonName,
      this.state.links,
      this.state.description,
      this.state.is_popup,
    ];
    this.state_array_index = [];
    for (let i=0; i<this.forms_fields.length; i++){
      this.state_array_index.push(i);
    };

  };

  componentDidMount() {
      console.log(Object.keys(this.state).length)
      axios
        .get(root.root_lessons + "admin/coursecount")
        .then((res) => {
          if (!res.data.courseLessonCount) return false;
          if (!res.data.courseWeekCount) return false;
          console.log(res.data, " this is not working");
          this.setState(() => {
            console.log(res.data);
            return {
              weekNumber: res.data.courseWeekCount,
              lessonNumber: res.data.courseLessonCount + 1,
            };
          });
        })
        .catch((err) => console.log(err));
  };

  handleSubmit(e) {
    e.preventDefault();

    if (!Validator(this.state)) {
      alert("Please check your field ");
      return false;
    }

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
  }

  handleClick() {
    this.setState((state) => {
      return {
        lessonId:
          "wk" + String(state.weekNumber) + "_ls" + String(state.lessonNumber),
      };
    });
  };

  handleNumberClick(e) {
    if (e.target.value - this.state.weekNumber === 1) {
      return false;
    } else {
      this.setState((state) => {
        return {
          weekNumber: state.weekNumber + 1,
        };
      });
    }
  };

  // https://www.youtube.com/embed/me3_XR7Iz60
  // [[name, id, value, onc1], [name, id, value, onc1]]
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
            {this.state_array_index.map((index) => {
              return (
                <label
                htmlFor={this.forms_fields[index][0]}
                name= {this.forms_fields[index][0]}
                id={this.forms_fields[index][0]}
                >
                {this.forms_fields[index][0]}
                <input
                type={this.forms_fields[index][1]}
                name={this.forms_fields[index][0]}
                id={this.forms_fields[index][0]}
                value={this.state_array[index]}              // It is not working as expected, only way is to make it in component and formik
                onClick= {this.forms_fields[index][3]}
                onChange= {this.forms_fields[index][4]}
                
                />
                </label>
              );
            })}
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
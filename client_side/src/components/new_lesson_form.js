import React, { useEffect } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { render } from "react-dom";
const root = require("./globalVar");

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyRadio = ({ children, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label className="checkbox-input">
        <input type="radio" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};
const form_state = (props) => {
  const state = {
    courses: [["Mathematics"], ["Python"], ["Statistics"], ["English"]],
    courseMap: {
      Mathematics: "maths101",
      Python: "python101",
      Statistics: "stats101",
      English: "english101",
    },
  };

  return state;
};

// And now we can use these
export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);

    this.state = {
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

  componentDidMount() {
    console.log(Object.keys(this.state).length);
    // axios
    // .get(root.root_lessons + "admin/coursecount")
    // .then((res) => {
    // if (!res.data.courseLessonCount) return false;
    // if (!res.data.courseWeekCount) return false;
    // this.setState(() => {
    // return {
    // weekNumber: res.data.courseWeekCount,
    // lessonNumber: res.data.courseLessonCount + 1,
    // };
    // });
    // })
    // .catch((err) => console.log(err));
  }
  handleNumberClick(e, type) {
    if (type === "l") {
      if (e.target.value - this.state.weekNumber === 1) {
        document.getElementById(e.target.id).innerHTML = (
          <MyTextInput
            label="Week Number"
            name="weekNumber"
            type="number"
            id="weekNumber"
            value={this.state.weekNumber}
            onClick={(e) => this.handleNumberClick(e, "w")}
            disabled={true}
          />
        );
        return false;
      } else {
        this.setState((state) => {
          console.log(state.weekNumber);
          return {
            lessonNumber: state.lessonNumber + 1,
          };
        });
        return;
      }
    } else {
      if (e.target.value - this.state.lessonNumber === 1) {
        document.getElementById(e.target.id).innerHTML = (
          <MyTextInput
            label="Week Number"
            name="weekNumber"
            type="number"
            id="weekNumber"
            value={this.state.weekNumber}
            onClick={(e) => this.handleNumberClick(e, "w")}
            disabled={true}
          />
        );

        return false;
      } else {
        this.setState((state) => {
          console.log(state.weekNumber);
          return {
            weekNumber: state.weekNumber + 1,
          };
        });
        return;
      }
    }
  }

  render() {
    return (
      <>
        <h1>Subscribe!</h1>
        <Formik
          initialValues={{
            weekName: "",
            lessonName: "",
            links: "",
            acceptedTerms: false, // added for our checkbox
            weekNumber: 1,
            lessonNumber: 1,
          }}
          validationSchema={Yup.object({
            weekName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            lessonName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            links: Yup.string()
              .url("Invalid url address")
              .required("Required"),
            acceptedTerms: Yup.boolean()
              .required("Required")
              .oneOf([true], "You must accept the terms and conditions."),
            is_popup: Yup.boolean()
              .oneOf([true, false], "You should expected to click")
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
                useEffect(() => {
                  axios.post(root.root_lessons + "/add",  values);
                  
                }, []);
              setSubmitting(false);
            }, 100);
          }}
        >
          {/* weekNumber: weekName: "i lessonId: "w lessonName: lessonNumber links: */}
          {/* courseId: is_popup: description: */}
          <Form>
            <MyTextInput
              label="Week Name"
              name="weekName"
              type="text"
              value={this.state.weekName}
              placeholder="Please enter name that macth follow up content of week"
              onChange={(e) => this.setState({ weekName: e.target.value })}
            />

            <MyTextInput
              label="Lesson Name"
              name="lessonName"
              value={this.state.lessonName}
              type="text"
              onChange={(e) => this.setState({ lessonName: e.target.value })}
              placeholder="Please type your lesson name that corresponds with lesson content"
            />

            <MyTextInput
              label="Vedio Link"
              name="links"
              type="url"
              value={this.state.links}
              onChange={(e) => this.setState({ links: e.target.value })}
              placeholder="Please type your lesson vedio link"
            />
            <MyTextInput
              label="Week Number"
              name="weekNumber"
              type="number"
              id="weekNumber"
              value={this.state.weekNumber}
              onClick={(e) => this.handleNumberClick(e, "w")}
            />

            <MyTextInput
              label="Lesson number"
              name="lessonNumber"
              type="lessonNumber"
              id="lessonNumber"
              value={this.state.lessonNumber}
              onClick={(e) => this.handleNumberClick(e, "l")}
            />
            <MyRadio labe="Please tick yes or no" name="is_popup">
              <input name="is_popup" id="true" />
              <input name="is_popup" id="false" />
            </MyRadio>
            <MyCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </MyCheckbox>

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </>
    );
  }
}

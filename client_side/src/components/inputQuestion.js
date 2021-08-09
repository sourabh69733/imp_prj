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

const LowerQuestion =(props) => {
    return <h4>Hi form lower question component</h4>
};

const UpperQuestion =(props) => {
    return <h4>Hi from upper  question component</h4>
};

const optionsComponent =(props) => {
    return <h4> Hie from answer </h4>
};

export default class DashboardQuestionInput extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state= {
            questions: '',
            options:'',
            answers:'',
            other:[],
            // question, option, answers  ---
        }
    };

    handleChange(e){
        e.preventDefault();
    }
    handleSubmit(e){
        e.preventDefault();
    }

    render() {
        return (
          <div>
            <Form
              initialValues={{
                questions: "",
                options: "",
                answers: "",
              }}
              validationSchema= {
                  Yup.object({
                      questions: Yup.string()
                      .min(10, "It is least expected for this field")
                      .required("It is requied"),
                      answers: Yup.String()
                      .min(10, "It should be brief")
                      .required("It is required"),
                      options:Yup.String()
                      .required("It is required")
                  })}
                  onSubmit = {(values, {setSubmitting}) => {
                      useEffect(() => {
                          axios.post(root.root_questions + "add", values);
                          return 
                      }, [values]);
                  }}
            >
            <LowerQuestion />
            
            </Form>
          </div>
        );
    }
}   
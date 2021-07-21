import React, {Component} from "react";
import axios from 'axios';

const root = require("./globalVar");

export default class DashboardQuestionInput extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state= {}
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
            
            </div>)
    }
}   
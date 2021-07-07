import React, { Component } from "react";
import { Link, useParams} from "react-router-dom";
const axios = require("axios");
const root = require("./globalVar");


export default class LessonsPlayer extends Component {
  constructor(props) {
    super(props);
    // this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      links: this.props.link,
    };
  }
  componentDidMount() {
    axios
      .get(root.root_lessons + this.props.match.params.id)
      .then((less) => {
        this.setState({
          links: less.data.data.links,
        });
      })
      .catch((error) => error);
  };

  
  render() {
    return (
      <div>
        <h5> It is working </h5>
        <iframe
          width="500"
          height="350"
          src={this.state.links}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
}
// https://www.youtube.com/embed/t6PA2E_G0do


/**

 */
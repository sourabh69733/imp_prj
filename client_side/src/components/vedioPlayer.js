import React, { Component } from "react";
const axios = require("axios");
const root = require("./globalVar");


export default class LessonsPlayer extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      links: '',
      loaded:false,
    };
  }
  componentDidMount() {
    if (
      !this.props.match.params.id ||
      this.props.match.params.id === "undefined"
    ) {
      console.log(this.state.loaded, this.state.links)
      this.setState({
        loaded: false,
      });
      return <div>it is not uploaded yet.</div>;
    }
    axios
      .get(root.root_lessons + this.props.match.params.id)
      .then((less) => {
        this.setState({
          links: less.data.data.links,
          loaded:true,
        });
      })
      .catch((error) => error);
      console.log(this.state.loaded, "it is not work")
  };

  
  render() {
    return (
      <div>
        <h5> It is working in vedio component </h5>
        {this.state.loaded && (
          <iframe
            width="500"
            height="350"
            src={this.state.links}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    );
  }
}
// https://www.youtube.com/embed/t6PA2E_G0do
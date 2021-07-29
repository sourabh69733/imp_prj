import React, {Component} from 'react';
import axios from 'axios';
import { root } from './globalVar';

export default class LessonList extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.handleUpdate = this.handleupdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      lessons: [],
    };  
  };

  componentDidMount(){
      axios.get(root.root_lessons)
      .then((res) => {
          console.log(res.data.map((item) => console.log(item)))
          this.setState({
              lessons:res.data.map((item)=> item)
          });
      })
  };


  componentWillMount(){
      this.componentDidMount();
  };
  
  handleUpdate(e) {
    return true;
  };

  render(){
    return (
      <div>
          {this.state.lessons.map((lesson) =>{
              return (
                <ul>
                  <li>{lesson.courseId}</li>
                  <li>{lesson.lessonId}</li>
                  <li>{lesson.links}</li>
                  <li>{lesson.description}</li>
                </ul>
              );
          })}
      </div>
      )
}};
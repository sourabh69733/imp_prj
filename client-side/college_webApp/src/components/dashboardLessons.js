import { Component } from "react";
import axios from 'axios';
const root = require('./globalVar');

export default class DashboardLessons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allArrayData: [],
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        axios.get(root.root_lessons)
            .then(res => {
                this.setState({
                    allArrayData:res.data
                })
            })
            .catch((err) => console.log(err));
        
    };
    componentWillUnmount() {
        this.componentDidMount();
    };

    render() {
        return (
          <div>
            <h5>It is rendred successfully</h5>
            <a
              type="reset"
              onClick={() => {
                axios
                  .delete(root.root_lessons + "delete")
                  .then((res) => res.data.deletedCount)
                  .catch((err) => err);
              }}
              href="/dashboard"
            >
              delete
            </a>
            {this.state.allArrayData.map((data) => {
              return (
                <div>
                  <ul>
                    <li>{data.lessonId}</li>
                    <li>{data.courseId} </li>
                    <li>{data.lessonName} </li>
                    <li>{data.links} </li>
                  </ul>
                </div>
              );
            })}
          </div>
        );
    }
}

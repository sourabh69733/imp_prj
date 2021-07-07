
import React, {useState} from 'react';
import axios from "axios";
const root = require("./globalVar");


export default function WeeksComponent(props) {
    var lessons = [
      ["l1", "l2", "l3", "l4"],
      ["l1", "l2", "l3"],
      ["l1", "l2", "l3"],
      ["l1", "l2", "l3", "l4", "l5", "l6"],
    ];
  
    var weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

    let [content, setContent] = useState([]);
    let [loaded, setLoaded] = useState(false);
    let [lesson, setLesson] = useState([]);
    let [idsArray, setIdsArray] = useState({});

    // If content not loaded, then load content form server
    const handleLoadingContent = () => {
      axios
        .get(root.root_lessons)
        .then((item) => {
          content.push(item.data);
          setContent(content);
        })
        .catch((err) => setContent(err));
        return content
        
    };

    const constructIds = (week, lesson) => {
      let week_arr = week.split(" ");
      const less_pat = /[0-9]+$/;
      const less_idx = lesson.search(less_pat);
      if (less_idx === -1) {
        return false;
      }
      // returns in format wk1_ls1
      return (
        "wk" +
        week_arr[week_arr.length - 1] +
        "_ls" +
        lesson.slice(less_idx, lesson.length)
      );
    };

    const get_ids = (weeks, lessons) => {

      for (let i=0; i<weeks.length; i++) {
        idsArray[weeks[i]] = [];
        for (let j=0; j< lessons[i].length; j++) {
          let id = constructIds(weeks[i], lessons[i][j]);
          if (!id) {
            return false;
          }
          idsArray[weeks[i]].push([id, lessons[i][j]])
        }
        setIdsArray(idsArray);
      }
    };

    if (content.length === 0) {
      handleLoadingContent();
    }
    
    if (Object.keys(idsArray).length === 0) {
      get_ids(weeks, lessons);
    };

    const handleContent = (e) => {
    const id = e.target.id;
    setLoaded(false);
    setLesson([]); 
    if (content) {
      lesson = content["0"].filter((item) => item["lessonId"]===id);
      if (lesson.length!==0 ){
        setLesson(lesson[0]);
        loaded = true; 
        setLoaded(loaded);
        
      }        
    }};



    const handleShow = (e) => {
      const Id = e.target.value;
      if (document.getElementById(Id).style.visibility === "hidden")
        document.getElementById(Id).style.visibility = "visible";
      else document.getElementById(Id).style.visibility = "hidden";
    };
  
    return (
      <div>
        <div className="sidebar">
          {weeks.map((week) => {
            return (
              <div className="weeks_lesson" key={week}>
                <button onClick={handleShow} value={week}>
                  {week}
                </button>

                <div
                  id={week}
                  name={week}
                  style={{ visibility: "hidden" }}
                  className="week"
                >
                  {idsArray[{ week }["week"]].map((item) => {
                    return (
                      <ul className="week">
                        <a
                          href={"/" + Object.values(lesson)[2]}
                          onClick={handleContent}
                          id={item[0]}
                          value={item[1]}
                          className="lesson_button"
                        >
                          {item[1]}
                        </a>
                      </ul>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
};

/**
 * 
 */
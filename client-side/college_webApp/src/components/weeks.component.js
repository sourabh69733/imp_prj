import React, {useState} from 'react';
const axios = require('axios');
// const Vedioplayer = require("./vedioPlayer");


export default function WeeksComponent(props) {
    var lessons = [
      ["l1", "l2", "l3", "l4"],
      ["l1", "l2", "l3"],
      ["l1", "l2", "l3"],
      ["l1", "l2", "l3", "l4", "l5", "l6"],
    ];
  
    var weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

    let [content, setContent] = useState({});
    let [loaded, setLoaded] = useState(false);
    let [lesson, setLesson] = useState([]);
    let [idsArray, setIdsArray] = useState({});
    var week_lessons = {};
    for (let i = 0; i < lessons.length; i++) week_lessons[weeks[i]] = lessons[i];

    // If content not loaded, then load content form server
    const handleLoadingContent = (e) => {
      axios
        .get("http://localhost:8000/lessons")
        .then((item) => {
          console.log(item.config)
          item.data.map((t) => (content[t.lessonId] = t.links));
        })
        .catch((err) => setContent(null));
      setContent(content);
        
    };

        if (!loaded) {
          handleLoadingContent();
          console.log(content);
          setLoaded(true);
        }

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
        let temp = [];
        
        for (let j=0; j< lessons.length; j++) {
          let id = constructIds(weeks[i], lessons[i][j]);
          if (!id) {
            return false;
          }
          temp.push(id);
        }
        idsArray[weeks[i]] = temp;
        temp = [];
      }
      setIdsArray(idsArray);
    };

    const handleContent = (e) => {
    const id = e.target.id;
    let count =0;
  
    if (content) {
      lesson = content.map((item) => {
        if (item[count].lessonId === id)
        return item[count]
        count+=1; 
      }
      );
      console.log(lesson);
      return setLesson(lesson);
    } else {
      return setLesson([]);
    };
    };

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
                  {week_lessons[{ week }["week"]].map((item) => {
                    return (
                      <ul className="week">
                        <button
                          type="submit"
                          onClick={handleContent}
                          id={
                            "wk" +
                            week.split(" ")[week.split(" ").length - 1] +
                            "_ls" +
                            +item.slice(item.search(/[0-9]+$/), item.length)
                          }
                          value={item}
                        >
                          {item}
                        </button>
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
}
import React, {useState} from 'react';
import './styles.css';
import {Link} from 'react-router-dom'

function App() {
  var lessons = [['l1','l2','l3','l4'],['l1','l2','l3'],['l1','l2','l3'],['l1','l2','l3','l4','l5','l6']]
  var weeks = ['Week 1','Week 2','Week 3','Week 4']
  // const [show, setShow] = useState(false);

  // lessons for every week, stored as list  -lessons lenght must be same as weeks lenght,
  // if no content for week, then pass empty list 
  var week_lessons ={}
  for (let i = 0; i < lessons.length; i++)
    week_lessons[weeks[i]] = lessons[i];

  // console.log(week_lessons["Week 2"].map((item) => console.log(4)));
  // console.log(lessons.map((item) => console.log(item)));
  

  // handle lessons visibility on basis of clicked or not 
  const handleShow = (e) => {
    const Id = e.target.value;    
    if (document.getElementById(Id).style.visibility === "hidden")
      document.getElementById(Id).style.visibility = "visible";
    else 
    document.getElementById(Id).style.visibility = 'hidden'
  };

  return (
    <div>
        {/* sidebar */}
        <div className="sidebar">
          {
            weeks.map((week) => {
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
                        <li>
                          {item}
                        </li>
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

export default App;

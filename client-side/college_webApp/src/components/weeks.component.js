import React from 'react';


export default function WeeksComponent(props) {
    var lessons = [
    ["l1", "l2", "l3", "l4"],
    ["l1", "l2", "l3"],
    ["l1", "l2", "l3"],
    ["l1", "l2", "l3", "l4", "l5", "l6"],
    ];
    var weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

    // lessons for every week, stored as list  -lessons lenght must be same as weeks lenght,
    // if no content for week, then pass empty list
    var week_lessons = {};
    for (let i = 0; i < lessons.length; i++)
    week_lessons[weeks[i]] = lessons[i];


    // Handle lessons visibility on basis of clicked or not
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
                        <li>{item}</li>
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
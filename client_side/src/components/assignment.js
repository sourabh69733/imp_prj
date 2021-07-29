import React ,{useEffect, useState} from 'react';
const LessonsPlayer = require("./vedioPlayer");


export default function Assignments () {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    return <LessonsPlayer link="https://www.youtube.com/embed/t6PA2E_G0do" />;
  },[loaded])
  return (
    <div>
      <th>
        
      </th>
    </div>
  )
}
/**
 * Basic functions like add more and read more button etc. All could be arranged here, then we can use them in other components
 * Make code clean and readable.
 */
import React, {useState} from 'react'

export function ReadMoreButtton(props) {
    // store state of readMore button to show and hide content
    const [readMore, setReadMore] = useState(false);
    // const read_id = props.id;
    

    return (
      <div>
        <button
          type="submit"
          id="read_more_btn"
          className="read-more"
          onClick={() => {
            if (!readMore)
            setReadMore(true);
            else setReadMore(false)
          }}
          name="Read More"
        >
          Read More
        </button>
        {readMore && ( props.hiddenContent)}
      </div>
    );
}

export const AddMoreButton =(props) => {
    var [more,setMore] = useState(0);
    setMore(more++);
    console.log(document.getElementById(props.id), props.id);

    function handleMore() {
      let arr = [];
      for (let i = 0; i < more; i++) {
        arr.append(<input id={props.id + String(i)} />);
    };

    return (
      <div>
        <button
          type="submit"
          id="add-more"
          className="read-more"
          onClick={() => {
            return (<input id={props.id + String(more)} />)();
          }}
        >
          Add More
        </button>                
        {/* {handleMore()} */}
      </div>
    );
};
};
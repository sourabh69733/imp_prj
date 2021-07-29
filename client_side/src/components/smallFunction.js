/**
 * Basic functions like add more and read more button etc. All could be arranged here, then we can use them in other components
 * Make code clean and readable.
 */
import React, {useState} from 'react'
import axios from 'axios';

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
export function AddMoreButton(props) {
  const [inputList, setInputList] = useState([props.lableName.map((item) => item)]);
  var [count,setCount] = useState(2);
  // handle input change
  const handleInputChange = (e, index) => {
  
    const list = [...inputList];
    list[index] = e.target.value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);

  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      inputList[0].splice(inputList[0].length - 1,1) +
        String(count),
    ]);
    count++;
    setCount(count);
  };

  return (
    <div className="AddButton" id = { props.id } >
      {inputList.map((x, i) => {
        return (
          <div className="addInput">
            <input
              name={x}
              key = {count}
              placeholder={x}
              value={x}
              onChange={(e) => handleInputChange(e, i)}
            />
            <div className="btn-box">
              {inputList.length !== 1 && (
                <button className="removeButton" onClick={() => handleRemoveClick(i)}>
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && (
                <button className="addButton" onClick={handleAddClick}>Add</button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/*
 * Could be used with youtube vedios as measure of statisfying or not with lectures content.
*/
export function UpvoteButton (props) {

    let [upVoteCount,setUpVoteCount] = useState(0);
    let [downVoteCount, setDownVoteCount] = useState(0);
    let [clicked , setClicked] = useState(false)

    axios
      .get("http://localhost:8000/lessons/votecount/"+props.params.id)
      .then((res) => {
        console.log(res.upvote);
        setUpVoteCount(res.upvote); setDownVoteCount(res.downvote);
      })
      .catch((err) => console.log(err));

    const handleUpClick = (e) => {
      e.preventDefault();
      if (!clicked){
        setUpVoteCount(() => upVoteCount++);
        setClicked(true);
      } else {
        setUpVoteCount(() => upVoteCount--
        );
      }

      axios.post("http://localhost:8000/lessons/votecount/"+props.params.id, {
        downvote: downVoteCount,
        upvote: upVoteCount,
      });
     
    };

    const handleDownClick =(e) => {
      e.preventDefault();
      if (!clicked) {
        setClicked(true);
        setDownVoteCount(() => downVoteCount++);
      } else {
        setDownVoteCount(() => downVoteCount--);
      }

      axios.post("http://localhost:8000/lessons/votecount/" + props.params.id, {
        downvote: downVoteCount,
        upvote: upVoteCount,
      });
    }

    return (
      <div>
        <div>
          <label id="upvote" name="vote">
            Upvote {upVoteCount}
            <i class="bi bi-hand-thumbs-up"></i>
            <input
              type="radio"
              id="upvote"
              name="vote"
              onClick={handleUpClick}
            />
          </label>
          <label id="downvote" name="vote">
            DownVote {downVoteCount}
            <i class="bi bi-hand-thumbs-down"></i>
            <input
              type="radio"
              id="downvote"
              name="vote"
              onClick={handleDownClick}
            />
          </label>
        </div>
      </div>
    );
}


export function FeedbackButton (props) {
    let [submitted,setSubmitted] = useState('');
    
    const lesson_id = props.lesson_id;
    function handleInput(e) {
      e.preventDefault();
      setSubmitted(e.target.value);
      axios
      .post("http://localhost.com:8000/lessons/feedback" ,{lesson_id:lesson_id,'feedback':submitted})
      .catch(err => console.log(err));
    }
    return (
      <div className="feedback">
        <div id="feedback">
          <label htmlFor="feedback" name="feedback" id="feedback">
          Feedback
            <input placeholder="Please type your Feedback,  it is highly appreciated" type="text" value={submitted} className="fd-intput"/>
          </label>
          <button type="submit" onClick={handleInput} className="fd-btn" >Send</button> 
        </div>
      </div>
    );
}
import React,{Component} from 'react';

class Test extends Component {
    constructor(props){
        super(props);
        this.state ={
            name:'',
            id:'',
            fieldName:'',
            className:"",
            key:"",
            value:[],
            content:'',
        }
    }
    render() {
      return (
        <div>
          {this.state.content.map((item) => {

          })}
        </div>)
    }
}


/**
 * [  {"week1" : {id_:, links: , pop: , }}, {id_: , links: , }
 * ]
 *  [w1, w2, w3,w4]
 * <ul>
 *  {l.map(item) => {
 *  <button>
 *  item 
 *  
 *  <ul className="week">
     <a
       href={"/" + Object.values(lesson)[2]}
       onClick={handleContent}
       id={item[weeks 1][0]}
       value={item[weeks 2][1]}
       className="lesson_button"
     >
       {item[1]}
     </a>
    </ul>

 */
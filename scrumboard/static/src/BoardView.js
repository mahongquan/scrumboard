import React, { Component } from 'react';
import  data from "./Data";
import  {Modal} from "react-bootstrap";
import StoryForm from "./StoryForm";
var moment = require('moment');
var locale=require('moment/locale/zh-cn');
// var DateTime=require('react-datetime');
class BoardView extends Component{  
  state={showModal:false,stage:null,story:null}
  closeModal=()=>{
    this.setState({showModal:false});
  }
  newStroy=(stage)=>{
    // console.log(stage)
    this.setState({showModal:true,stage:stage,story:null});
  }  
  editStory=(story)=>{
    this.setState({showModal:true,story:story,stage:null});
  }
  render=()=>{
    let index=this.props.index;
    let item=data.config.boards[index];//index
    let stories=data.config.boards[index].stories;
    let stages=[
      {duan:0,board_index:index,stories:[],title:data.duan_name[0]}
      ,{duan:1,board_index:index,stories:[],title:data.duan_name[1]}
      ,{duan:2,board_index:index,stories:[],title:data.duan_name[2]}];
    for(var i=0;i<stories.length;i++){
      let item=stories[i];
      item.time=moment(item.time);
      stages[item.duan].stories.push(item)
    }
    let div_stages=stages.map((item,key)=>{
        let div_stories=item.stories.map((item,key)=>{
        	if(item.duan==2){
				return(<li key={key} >
                        <a className="description" onClick={()=>{this.editStory(item)}}
                        href="javascript: void 0" style={{backgroundColor:item.color}}>
                        {item.description}
                        </a>
                      </li>);
        	}
        	else{
          		return(<li key={key} className="story" >
                        <a className="description" onClick={()=>{this.editStory(item)}}
                        href="javascript: void 0" style={{backgroundColor:item.color}}>
                        {item.description}
                        </a>
                      </li>);
          	}
        });
        if(item.duan===2){
          return(<div key={key} className="stage"> 
                <h2>{item.title}</h2>
                <ul>
                   {div_stories}
                </ul>
            </div>);
        }
        else{
           return(<div key={key} className="stage" > 
               <h2>{item.title}</h2>
               <div className="stories"> 
                  <ul>
                     {div_stories}
                    <li className='drop'></li>
                    <li className='not-sortable'>
                    <button className='new btn btn-info btn-large' onClick={()=>{this.newStroy(item)}}>新事项</button>
                    </li>

                  </ul>
               </div>
          </div>);
        }
    });
    return(
<div>
    <div id="stages" style={{display:"flex"}}>
          {div_stages}
    </div>
    <StoryForm story={this.state.story} stage={this.state.stage} showModal={this.state.showModal} closeModal={this.closeModal} />
</div>)
  }
}
export default  BoardView;
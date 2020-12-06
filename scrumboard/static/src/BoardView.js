import React, { Component } from 'react';
import  Client from "./Client"
import StoryForm from "./StoryForm";
import StoryView from "./StoryView";
// var moment = require('moment');
// var locale=require('moment/locale/zh-cn');
// var DateTime=require('react-datetime');
class BoardView extends Component{  
  state={showModal:false,stages:[],stage:null,story:null}
  componentDidMount = () => {
    if (this.props.board_id) {
      this.loaddata(this.props.board_id);
    }
    this.unload=false;
  };
  componentWillUnmount = () => {
    this.unload = true;
  };
  componentDidUpdate(prevProps) {
    if (prevProps.board_id !== this.props.board_id && this.props.board_id) {
      this.load_data(this.props.board_id);
    }
  }
  loaddata=(id)=>{
    let data={board:id}
    let err_callback=null;
    Client.stages(data, (res)=>{
      // console.log(res);
      this.setState({stages:res});
    }, err_callback)
  }
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
    let div_stages=this.state.stages.map((item,key)=>{
           return(<div key={key} className="stage" > 
               <h2>{item.title}</h2>
               <div className="stories"> 
                  <ul>
                     <StoryView key={key} stageid={item.id}></StoryView>
                    <li className='drop'></li>
                    <li className='not-sortable'>
                    <button className='new btn btn-info btn-large' onClick={()=>{this.newStroy(item)}}>新事项</button>
                    </li>

                  </ul>
               </div>
          </div>);
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
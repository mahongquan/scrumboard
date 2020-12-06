import React, { Component } from 'react';
import  Client from "./Client"
export default class StoryView extends Component{  
  state={showModal:false,storys:[]}
  componentDidMount = () => {
    if (this.props.stageid) {
      this.loaddata(this.props.stageid);
    }
    this.unload=false;
  };
  componentWillUnmount = () => {
    this.unload = true;
  };
  componentDidUpdate(prevProps) {
    if (prevProps.stageid !== this.props.stageid && this.props.stageid) {
      console.log("did update")
      this.load_data(this.props.stageid);
    }
  }
  loaddata=(id)=>{
    let data={stage:id}
    let err_callback=null;
    Client.storys(data, (res)=>{
      // console.log(res);
      this.setState({storys:res});
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
        let div_stories=this.state.storys.map((item,key)=>{
        	if(item.duan===2){
				    return(<li key={key} >
                        <button className="description" onClick={()=>{this.editStory(item)}}
                         style={{backgroundColor:item.color}}>
                        {"description:"+item.description}
                        </button>
                      </li>);
        	}
        	else{
          		return(<li key={key} className="story" >
                        <button className="description" onClick={()=>{this.editStory(item)}}
                         style={{backgroundColor:item.color}}>
                        {"description:"+item.description}
                        </button>
                      </li>);
          	}
        });
    return(
    <div id="stories" style={{display:"flex",flexDirection:"column"}}>
          {div_stories}
    </div>
    )
  }
}

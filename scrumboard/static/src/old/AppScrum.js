import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Tabs, Tab, TabContainer, TabContent, TabPane} from 'react-bootstrap'
    // <script type="text/template" id="BoardItemTemplate">
    //     <a href="/board/<%= item.id %>"><%= item.title %></a>
    // </script>

    // <script type="text/template" id="StageTemplate">
    //     <h2><%= title %></h2>
    //     <div class="stories"></div>
    // </script>

    // <script type="text/template" id="StoryTemplate">
    //     <a class="description" href="javascript: void 0" style="background-color:<%=color%>">
    //         <%= description %> <%= stage_id %>
    //     </a>
    // </script>
import  data from "./Data";
class Board{
  static id1=0;
  constructor(title){
    this.title=title;
    this.id=Board.id1++;
    this.stages=[{id:Board.id1++,title:"todo",stories:[]}
    ,{id:Board.id1++,title:"process",stories:[]}];
  }
}
class Root extends Component<Props> {
state={boards:data.boards,activeid:undefined}
constructor(){
  super();
}
updateValue=(e)=>{
    //console.log(e.target.value);
    this.setState({
      selectValue: e.target.value+' animated',
    });
    setTimeout(this.check,1000);
}
componentDidMount=() => {
   
}
animationEnd = (el)=> {
  var animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  };

  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
  return 
}

check=()=>{
  if(this.animationEnd(this.refs.contactedit)){
    console.log("end");
    this.setState({selectValue:""})
  }
  else{
      setTimeout(this.check,1000);
  }
}
new_board=()=>{
  // console.log("new board");
  // boards=this.state.boards;
  console.log(data);
  data.boards.push(new Board('aaaaa'));
  this.setState({boards:data.boards});
}
clickBoard=(id)=>{
  console.log(id);
  console.log(this.props);
  this.setState({activeid:id});
  this.props.history.push("/board/"+id);
}
  render() {
    console.log("render");
    console.log(this.state);
    let boarditem_views=this.state.boards.map((item,key)=>{
       if (item.id===this.state.activeid)
      {
        return(<li key={key} className="active"><a style={{margin:"10px 10px 10px 10px"}} 
          onClick={()=>{;}}>{ item.title }</a></li>
          );
      }
      else{
        return(<li key={key} ><a style={{margin:"10px 10px 10px 10px"}} 
          onClick={()=>{this.clickBoard(key);}}>{ item.title }</a></li>
          ); 
      }
    });
    return (
  <div>
<div className="container-fluid">
    <div className="row-fluid" id="header">
        <div className="span12" id="top-bar">
            <Link to="/" id="logo"><h1>Scrum<span>Board</span></h1></Link>
    <div id="board-info">
        <h3 id="board-title"></h3>
        <div style={{float:"right",padding:"4px 10px 0px 2px"}}>
            <a className="destroy" href="javascript:void 0">Delete</a> <br />
            <a className="change" href="javascript:void 0">Change</a>
        </div>
    </div>

        </div>
    </div>

    <div id="select-board">
        <button onClick={this.new_board} 
        style={{float:"right",marginTop:"4px",marginBottom:"3px"}} 
        className="btn btn-primary new" 
        href="javascript:void 0">Add Board</button>
         <ul className="nav nav-tabs">{boarditem_views}</ul>
    </div>
<Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
  <Tab eventKey={1} title="Tab 1">
    Tab 1 content
  </Tab>
  <Tab eventKey={2} title="Tab 2">
    Tab 2 content
  </Tab>
  <Tab eventKey={3} title="Tab 3" disabled>
    Tab 3 content
  </Tab>
</Tabs>

</div>

  </div>);}
}
export default  withRouter(Root);
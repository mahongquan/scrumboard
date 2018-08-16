import React, { Component } from 'react';
import  {Modal} from "react-bootstrap";
import  data from "./Data";

export default class StoryForm extends Component{
  state={id:-1,color:"#b3ff20",description:"",time:new Date(),duan:0}
  color_change=(e)=>{
    this.setState({color:e.target.value});
  }
  onChange=(e)=>{
    this.setState({description:e.target.value});
  }
  componentWillReceiveProps(nextProps) {
    if(!this.props.showModal && nextProps.showModal){
      this.onShow(nextProps);
    }
    else if(this.props.showModal && !nextProps.showModal)
    {
      this.onHide();
    }
  } 
  onShow=(nextProps)=>{
    console.log("onShow");
    console.log(nextProps);
      if(nextProps.story){
        console.log(nextProps);
        this.setState({id:nextProps.story.id
          ,color:nextProps.story.color
          ,description:nextProps.story.description
          ,duan:nextProps.story.duan});
      }
      else{
        this.setState({id:-1,color:"#b3ff20",description:"",duan:nextProps.stage.duan});
      }
  }
  onHide=()=>{

  }
  upgrade=()=>{
    if(this.state.duan===0){
      this.setState({duan:1});
    }
    else if(this.state.duan===1){
      this.setState({duan:2});
    }
  }
  save=()=>{
    if(this.state.id>=0){
        this.props.story.color=this.state.color;
        this.props.story.description=this.state.description;
        this.props.story.duan=this.state.duan;
        this.props.closeModal();
    }
    else{
        // this.props.stage.stories.push(new Story(this.state.color,this.state.description));
        let s=data.new_Story(this.props.stage.board_index,this.state.color,this.state.description,this.props.stage.duan);
        // s.duan=this.props.stage.duan;
        // data.config.boards[this.props.stage.board_index].stories.push(s);
        this.props.closeModal();
    }
  }
  render=()=>{
    let div_upgrade=null;
    if(this.state.duan===0){
      div_upgrade=(<button onClick={this.upgrade}>开工</button>);
    }
    else if(this.state.duan===1){
       div_upgrade=(<button onClick={this.upgrade}>完成</button>);
    }
    return(
      <Modal  show={this.props.showModal}  onHide={this.props.closeModal}>
        <Modal.Header closeButton>
            <h2>Edit story</h2>
        </Modal.Header>
        <Modal.Body>
            <form action="#">
              <table>
              <tbody>
                <tr style={{display:"none"}}>
                <td><label>id</label></td>
                <td >
                  <input defaultValue={this.state.id}>
                  </input>
                </td>
                </tr>
                <tr >
                <td><label>time</label></td>
                <td >
                  <input defaultValue={this.state.time}>
                  </input>
                </td>
                </tr>
               <tr>
                <td><label>Description</label></td>
                <td >
                  <textarea className="story" value={this.state.description} 
                    onChange={this.onChange}
                    style={{backgroundColor:this.state.color}} name="description" id="description"
                     cols="50" rows="5">
                  }
                  </textarea>
                </td>
                </tr>
                <tr>
                <td><label>Color</label></td>
                <td><select name="color" id="color" onChange={this.color_change}>
                    <option value="#b3ff20">Green</option>
                    <option value="#ff5382">Pink</option>
                    <option value="yellow">Yellow</option>
                    <option value="#76e9ff">Blue</option>
                    <option value="#ffb618">Orange</option>
                </select></td>
              </tr>
              <tr >
                <td><label>duan</label></td>
                <td >
                  <input  disabled="disabled" value={data.duan_name[this.state.duan]} />
                  {div_upgrade}
                </td>
                </tr>
              </tbody>
              </table>
            </form>
        </Modal.Body>
        <Modal.Footer>

            <button onClick={this.save} className="btn save btn-primary">Save changes</button>        
        </Modal.Footer>
        </Modal>
        );
  }
}
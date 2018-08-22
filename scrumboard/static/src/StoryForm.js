import React, { Component } from 'react';
import  {Modal} from "react-bootstrap";
import  data from "./Data";
var moment = require('moment');
var locale=require('moment/locale/zh-cn');
// var DateTime=require('react-datetime');

export default class StoryForm extends Component{
  state={id:-1,color:"#b3ff20",description:"",time:moment(),duan:0}
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
    // console.log("onShow");
    // console.log(nextProps);
      if(nextProps.story){
        // console.log(nextProps);
        let t=nextProps.story.time;
        if(!t){
          t=moment();
        }
        this.setState({id:nextProps.story.id
          ,color:nextProps.story.color
          ,description:nextProps.story.description
          ,time:t
          ,duan:nextProps.story.duan});
      }
      else{
        this.setState({id:-1,color:"#b3ff20",description:""
          ,time:moment()
          ,duan:nextProps.stage.duan});
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
        this.props.story.time=this.state.time;
        this.props.closeModal();
    }
    else{
        // this.props.stage.stories.push(new Story(this.state.color,this.state.description));
        let s=data.new_Story(this.props.stage.board_index
          ,this.state.color
          ,this.state.description
          ,this.state.duan
          ,this.state.time);
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
            <h2>编辑事项</h2>
        </Modal.Header>
        <Modal.Body>
              <table style={{width:"100%"}}>
              <tbody>
                <tr style={{display:"none"}}>
                <td><label>id</label></td>
                <td >
                  <input defaultValue={this.state.id} />
                </td>
                </tr>
                <tr >
                <td><label>时间</label></td>
                <td >
                  <input  disabled="disabled" value={this.state.time.toLocaleString()} />
                </td>
                </tr>
               <tr>
                <td><label>内容</label></td>
                <td >
                  <textarea  value={this.state.description} 
                    onChange={this.onChange}
                    style={{fontSize:"24px"
                      ,borderRadius: "0.3em"
                      ,backgroundColor:this.state.color
                      ,width:"100%"}} 
                    rows="5" />
                </td>
                </tr>
                <tr>
                <td><label>颜色</label></td>
                <td>
                  <select name="color" value={this.state.color} id="color" onChange={this.color_change}>
                    <option value="#b3ff20">绿</option>
                    <option value="#ff5382">红</option>
                    <option value="yellow">黄</option>
                    <option value="#76e9ff">蓝</option>
                    <option value="#ffb618">橙</option>
                  </select>
                </td>
              </tr>
              <tr >
                <td><label>状态</label></td>
                <td >
                  <input  disabled="disabled" value={data.duan_name[this.state.duan]} />
                  {div_upgrade}
                </td>
                </tr>
              </tbody>
              </table>
        </Modal.Body>
        <Modal.Footer>
            <button onClick={this.save} className="btn save btn-primary">保存</button>        
        </Modal.Footer>
        </Modal>
        );
  }
}
import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import  data from "./Data";
import  {Modal} from "react-bootstrap";
    // <script type="text/template" id="BoardItemTemplate">
    //     <a href="/board/<%= item.id %>"><%= item.title %></a>
    // </script>

    // <script type="text/template" id="StageTemplate">
    //     <h2><%= title %></h2>
    //     <div class="stories"></div>
    // </script>

    // <script type="text/template" id="StoryTemplate">
        // <a class="description" href="javascript: void 0" style="background-color:<%=color%>">
        //     <%= description %> <%= stage_id %>
        // </a>
    // </script>
class StoryForm extends Component{
  state={color:"#b3ff20",description:""}
  color_change=(e)=>{
    this.setState({color:e.target.value});
  }
  onChange=(e)=>{
    this.setState({description:e.target.value});
  }
  
  save=()=>{

  }
  render=()=>{
    return(
      <Modal  show={this.props.showModal}  onHide={this.props.closeModal}>
        <Modal.Header closeButton>
            <h2>Edit story</h2>
        </Modal.Header>
        <Modal.Body>
            <form action="#">
              <table>
              <tbody>
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
class BoardView extends Component{  
  state={showModal:false}
  closeModal=()=>{
    this.setState({showModal:false});
  }
  newStroy=(stage)=>{
    console.log(stage)
    this.setState({showModal:true});
  }  
  render=()=>{
    console.log(this.state);
    console.log(this.props);

    let id=parseInt(this.props.match.params.id);
    let item=data.boards[id];
    let stages=data.boards[id].stages;
    let div_stages=stages.map((item,key)=>{
        let div_stories=item.stories.map((item,key)=>{
          return(<li className="story" >
                        <a className="description" 
                        href="javascript: void 0" style={{backgroundColor:"green"}}>
                        {item.description}
                        </a>
                      </li>);
        });
        return(<div key={key} className="stage" > 
               <h2>{item.title}</h2>
               <div className="stories">
                  <ul>
                     {div_stories}
                    <li className='drop'></li>
                    <li className='not-sortable'>
                    <button className='new btn btn-info btn-large' onClick={()=>{this.newStroy(item)}}>New</button>
                    </li>

                  </ul>
               </div>
          </div>);
    });
    return(
<div className="row-fluid" id="app">
    <div id="stages">
          {div_stages}
    </div>
    <StoryForm showModal={this.state.showModal} closeModal={this.closeModal} />
</div>)
  }
}
export default  withRouter(BoardView);
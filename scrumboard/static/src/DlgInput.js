import React, { Component } from 'react';
import  {Modal} from "react-bootstrap";
export default class DlgInput extends Component{
  state={description:""}
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
   this.setState({description:""});
  }
  onHide=()=>{

  }
  ok=()=>{
        this.props.closeModal(this.state.description);
  }
  cancel=()=>{
        this.props.closeModal();
  }
  render=()=>{
    return(
      <Modal  show={this.props.showModal}  onHide={this.props.closeModal}>
        <Modal.Header closeButton>
            <h2>input name</h2>
        </Modal.Header>
        <Modal.Body>
                  <input style={{width:"100%"}} value={this.state.description} 
                    onChange={this.onChange} />
        </Modal.Body>
        <Modal.Footer>
            <button onClick={this.ok} className="btn save btn-primary">Ok</button>        
            <button onClick={this.cancel} className="btn save btn-primary">Cancel</button>        
        </Modal.Footer>
        </Modal>
        );
  }
}
import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

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
      <Dialog  open={this.props.showModal}  onHide={this.props.closeModal}>
        <DialogTitle>
            <h2>input name</h2>
        </DialogTitle>
        <DialogContent>
                  <input value={this.state.description} 
                    onChange={this.onChange} />
        </DialogContent>
        <DialogActions>
            <button onClick={this.ok} className="btn save btn-primary">Ok</button>        
            <button onClick={this.cancel} className="btn save btn-primary">Cancel</button>        
        </DialogActions>
        </Dialog>
        );
  }
}
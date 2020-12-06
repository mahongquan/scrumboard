import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

export default class DlgOkCancel extends Component{
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
  }
  onHide=()=>{
  }
  ok=()=>{
        this.props.closeModal(true);
  }
  cancel=()=>{
        this.props.closeModal();
  }
  render=()=>{
    return(
      <Dialog  open={this.props.open}  onHide={this.props.closeModal}>
        <DialogTitle>
            <h2>Are you sure?</h2>
        </DialogTitle>
        <DialogContent>
          {this.props.description}
        </DialogContent>
        <DialogActions>
            <button onClick={this.ok} className="btn save btn-primary">Ok</button>        
            <button onClick={this.cancel} className="btn save btn-primary">Cancel</button>        
        </DialogActions>
        </Dialog>
        );
  }
}
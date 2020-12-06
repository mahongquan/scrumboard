import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import  data from "./Data";
// var {electron}=window.require("electron");//
export default class App extends React.Component{
  onClick=()=>{
    // electron.shell.openExternal(data.config.website);
  }
  render=()=>{
    return <Dialog
        open={this.props.showModal}
        onClose={this.props.closeModal}
      >
        <DialogTitle>
            关于便帖薄
        </DialogTitle>
        <DialogContent>
          <table>
          <tbody>
          <tr><td><div style={{display:"flex"
              ,marginRight:"10px"
              ,justifyContent:"flex-end"
              ,alignItems: "center"}}>版本:</div></td><td>{""}</td></tr>
          <tr><td  style={{display:"flex"
              ,marginRight:"10px"
              ,justifyContent:"flex-end"
              ,alignItems: "center"}}>作者:</td><td>{""}</td></tr>
          <tr><td  style={{display:"flex"
              ,marginRight:"10px"
              ,justifyContent:"flex-end"
              ,alignItems: "center"}}>电子邮箱:</td><td>{""}</td></tr>
          <tr><td  style={{display:"flex"
              ,marginRight:"10px"
              ,justifyContent:"flex-end"
              ,alignItems: "center"}}>网站:</td><td><button onClick={this.onClick}>{""}</button></td></tr>
          </tbody></table>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-primary" onClick={this.props.closeModal}>
            确定
          </button>
        </DialogActions>
      </Dialog>;
    }
}
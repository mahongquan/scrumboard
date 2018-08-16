import React from 'react';
import  {Modal} from "react-bootstrap";
import  data from "./Data";
var {electron}=window.require("electron");//
export default class App extends React.Component{
  onClick=()=>{
    electron.shell.openExternal(data.config.website);
  }
  render=()=>{
    return <Modal
        show={this.props.showModal}
        onClose={this.props.closeModal}
      >
        <Modal.Header>
            About Note
        </Modal.Header>
        <Modal.Body>
          <table>
          <tbody>
          <tr><td>Version:</td><td>{data.config.version}</td></tr>
          <tr><td>Author:</td><td>{data.config.author.name}</td></tr>
          <tr><td>email:</td><td>{data.config.author.email}</td></tr>
          <tr><td>website:</td><td><a onClick={this.onClick}>{data.config.website}</a></td></tr>
          </tbody></table>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.props.closeModal}>
            ok
          </button>
        </Modal.Footer>
      </Modal>;
    }
}
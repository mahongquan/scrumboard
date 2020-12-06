import React, { Component } from 'react';
import BoardView from './BoardView';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import DlgAbout from './DlgAbout';
import DlgInput from "./DlgInput";
import DlgOkCancel from './DlgOkCancel';
import Client from "./Client"
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});
function TabPanel(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
};
class AppScrum extends Component<Props> {
  constructor(){
    super();
    // data.getconfig();
    this.state={
      boards:[],
      value:0,
      class_anim:"",
      show_input:false,
      show_about:false,
      show_ok:false}
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  updateValue=(e)=>{
      //console.log(e.target.value);
      this.setState({
        class_anim: e.target.value+' animated',
      });
      setTimeout(this.check,1000);
  }
  componentDidMount=() => {
     this.anim();
     this.loaddata();
  }
  loaddata=()=>{
    let data={}
    let err_callback=null;
    Client.boards(data, (res)=>{
      console.log(res);
      this.setState({boards:res});
    }, err_callback)
  }
  anim=()=>{
    //console.log(e.target.value);
    this.setState({
      class_anim: 'bounceOutRight animated',
    },()=>{
      setTimeout(this.check,1000);
    });
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
    if(this.animationEnd(this.refs.div_anim)){
      // console.log("end");
      this.setState({class_anim:""})
    }
    else{
        setTimeout(this.check,1000);
    }
  }
  new_board=()=>{
    // console.log("new board");
    // boards=this.state.boards;
    // console.log(data);
    // data.boards.push(new Board('aaaaa'));
    this.setState({show_input:true});// boards:data.boards});

  }
  clickBoard=(id)=>{
    console.log(id);
    console.log(this.props);
    this.setState({activeid:id});
    this.props.history.push("/board/"+id);
  }
  deleteBoard=()=>{
    this.setState({show_ok:true});
  }
  close_input=(name)=>{
    if(name){
      // data.new_Board(name);
      this.setState({boards:[]});    
    }
    this.setState({show_input:false});
  }
  close_ok=(sure)=>{
    this.setState({show_ok:false});
    if(sure){
      // const filteredFoods = data.config.boards.filter(
      //       (item, idx) => this.idx !== idx,
      // );
      // data.config.boards=filteredFoods;
      // this.setState({boards:[]});    
    }
  }
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    // console.log("render");
    // console.log(this.state);
    // let boarditem_views=this.state.boards.map((item,key)=>{
    //     return(<Tab eventKey={key} key={key} title={item.title}>
    //       <BoardView id={key} />
    //     </Tab>); 
    // });
    let boarditem_list=this.state.boards.map((item,key)=>{
        return(<Tab  label={item.title} key={key} board_id={item.id}>
          </Tab>); 
    });
    let boarditem_panels=this.state.boards.map((item,key)=>{
        return(
        <TabPanel  key={key} style={{padding:"0px 10px 10px 10px"}}>
          <BoardView board_id={item.id} index={key} />
        </TabPanel>
        ); 
    });
    return (
  <div  ref="div_anim" className={classes.root+" "+this.state.class_anim}>
    <AppBar position="static">
        <Toolbar>
        <Button onClick={this.new_board} 
            >新建</Button>
            <Button onClick={this.deleteBoard}>
             删除
            </Button>
            <Button onClick={()=>{
              this.setState({show_about:true})
            }}>
             关于
            </Button>
            </Toolbar>    
        <Tabs onChange={this.handleChange}>
          {boarditem_list}
        </Tabs>

    </AppBar>
    {boarditem_panels[value]}
    <DlgInput showModal={this.state.show_input} closeModal={this.close_input} />
    <DlgOkCancel description="删除事项板" open={this.state.show_ok} closeModal={this.close_ok} />
    <DlgAbout showModal={this.state.show_about} closeModal={()=>{
      this.setState({show_about:false});
    }} />
  </div>);}
}
export default withStyles(styles)(AppScrum);
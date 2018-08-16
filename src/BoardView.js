import React, { Component } from 'react';
import  data from "./Data";
import  {Modal} from "react-bootstrap";
import StoryForm from "./StoryForm";
class BoardView extends Component{  
  state={showModal:false,stage:null,story:null}
  closeModal=()=>{
    this.setState({showModal:false});
  }
  newStroy=(stage)=>{
    console.log(stage)
    this.setState({showModal:true,stage:stage,story:null});
  }  
  editStory=(story)=>{
    this.setState({showModal:true,story:story,stage:null});
  }
  render=()=>{
    let index=this.props.index;
    let item=data.config.boards[index];//index
    let stories=data.config.boards[index].stories;
    let stages=[];
    for(var duan=0;duan<3;duan++){
       const stories0= stories.filter(
              (item, idx) => item.duan === duan,
        );
       let stage0={};
       stage0.title=data.duan_name[duan]
       stage0.stories=stories0;
       stage0.board_index=index;
       stage0.duan=duan
       stages.push(stage0);
     }
     // const stories1= stories.filter(
     //        (item, idx) => item.duan === 1,
     //  );
     // let stage1={};
     // stage1.title="process"
     // stage1.stories=stories1;
     // stage0.board_index=index;
     // stage0.duan=1 
     // stages.push(stage1);
     // const stories2= stories.filter(
     //        (item, idx) => item.duan === 2,
     //  );
     // let stage2={};
     // stage2.title="archive"
     // stage2.stories=stories2;
     // stage0.board_index=index;
     // stage0.duan=2 
     // stages.push(stage2);
    let div_stages=stages.map((item,key)=>{
        let div_stories=item.stories.map((item,key)=>{
          return(<li key={key} className="story" >
                        <a className="description" onClick={()=>{this.editStory(item)}}
                        href="javascript: void 0" style={{backgroundColor:item.color}}>
                        {item.description}
                        </a>
                      </li>);
        });
        if(item.duan===2){
          return(<div key={key} className="stage" > 
                 <h2>{item.title}</h2>
                 <div className="stories">
                    <ul>
                       {div_stories}
                    </ul>
                 </div>
            </div>);
        }
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
    // let stages=data.config.boards[id].stages;
    // let div_stages=stages.map((item,key)=>{
    //     let div_stories=item.stories.map((item,key)=>{
    //       return(<li key={key} className="story" >
    //                     <a className="description" onClick={()=>{this.editStory(item)}}
    //                     href="javascript: void 0" style={{backgroundColor:item.color}}>
    //                     {item.description}
    //                     </a>
    //                   </li>);
    //     });
    //     return(<div key={key} className="stage" > 
    //            <h2>{item.title}</h2>
    //            <div className="stories">
    //               <ul>
    //                  {div_stories}
    //                 <li className='drop'></li>
    //                 <li className='not-sortable'>
    //                 <button className='new btn btn-info btn-large' onClick={()=>{this.newStroy(item)}}>New</button>
    //                 </li>

    //               </ul>
    //            </div>
    //       </div>);
    // });
    return(
<div className="row-fluid" id="app">
    <div id="stages">
          {div_stages}
    </div>
    <StoryForm story={this.state.story} stage={this.state.stage} showModal={this.state.showModal} closeModal={this.closeModal} />
</div>)
  }
}
export default  BoardView;
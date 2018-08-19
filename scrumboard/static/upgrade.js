const fs=require("fs");
const path=require("path");
// export class Board{
//   static id1=0;
//   constructor(title){
//     this.title=title;
//     this.id=Data.config.id++;
//     this.stages=[{id:Board.id1++,title:"要做",stories:[]}
//     ,{id:Board.id1++,title:"正在做",stories:[]}
//     ,{id:Board.id1++,title:"已完成 ",stories:[]}
//     ];
//   }
// }
function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};
// export class Story{
//  constructor(color,description){
//  	this.color=color;
//  	this.description=description;
//  	this.id=Data.config.id++;
//   this.time=new Date();
//   this.duan=0;
//  }
// }
const initpath=__dirname;
class Upgrade_dot1_dot2{
  static saveconfig(data){
      const configName = 'config.json';
      let configPath = path.join(initpath, configName);
      fs.writeFileSync(configPath, JSON.stringify(data));
  }
  static upgradeBoard(board){
    let stories=[]
    for(var i=0;i<board.stages.length;i++){
      
      for(var j=0;j<board.stages[i].stories.length;j++){
          let story=board.stages[i].stories[j];
          story.duan=i;
          stories.push(story);
      }
    }
    board.stories=stories;
    delete board.stages;
  }
  static upgrade(data){
    data.version="0.2";
    for(var i=0;i<data.boards.length;i++){
        Upgrade_dot1_dot2.upgradeBoard(data.boards[i])
    }
    return data;
  }
  static getconfig(){
      try{
        const configName = 'config.json';
        let configPath = path.join(initpath, configName);
        console.log(configPath);
        let data=fs.readFileSync(configPath, { enconding: 'utf-8' });
        let config=JSON.parse(data);
        return config;
      }
      catch(e){
      	console.log(e);
        return {};
      }
 }
}
let config=Upgrade_dot1_dot2.getconfig();
let config2=Upgrade_dot1_dot2.upgrade(config);
Upgrade_dot1_dot2.saveconfig(config2);


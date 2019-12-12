import React from 'react';
import ReactDOM from 'react-dom';
const fs= require('fs');
const path=require('path');
// console.log(path);
function fileExist(p){
    if(fs.existsSync(p)){
      return true;
    }
    return false;
}
function link(where,module_name) {
  // body...
  var thelink=document.createElement('link');
  thelink.setAttribute("rel","stylesheet");
  var file1=path.join(where,module_name)
  thelink.setAttribute("href",file1);
  document.head.appendChild(thelink);
}
function getWhere(){
  let p=window.require('electron').ipcRenderer.sendSync('getpath');
  console.log(p);
  let where;
  if(p==="."){
     where=path.join(p,".."); 
  }
  else{
    where=path.join(p,"../../..");
  }
  console.log(where);
  return where;
}
let module_name;
let where=getWhere();
console.log(where);
let App;
module_name="./AppScrum";  
link(where,"node_modules/react-tabs/style/react-tabs.css");
link(where,"node_modules/bootstrap/dist/css/bootstrap.min.css");
link(where,"node_modules/bootstrap/dist/css/bootstrap-theme.min.css");
link("./","style.css");
link("./","animate.min.css");
App=require(module_name).default;
ReactDOM.render(<App />, document.getElementById('root'));

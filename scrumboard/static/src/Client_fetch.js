import queryString from 'querystring';
// import myglobal from './myglobal';
// const fetch = require('node-fetch');
let host = '';
if (window.require) {
  host = 'http://127.0.0.1:8000';
}
function myFetch(method, url, body, cb, headers2, err_callback) {
  let data;
  let headers;
  if (headers2) {
    headers = headers2;
  } else {
    headers = { 'Content-Type': 'application/json' };
  }
  if (method === 'GET') {
    data = {
      method: method,
      credentials: 'include',
      headers: headers,
    };
  } else {
    data = {
      method: method,
      credentials: 'include',
      headers: headers,
      body: body,
    };
  }
  return fetch(host + url, data)
    .then((response)=>{
      // console.log(response);
    	if (response.status >= 200 && response.status < 300) {
        // console.log(response);
    	  	var r = response.json();
		    r.then(cb).catch(err_callback);
		  }
		  else{
			  const error = new Error(`HTTP Error ${response.statusText}`);
			  error.status = response.statusText;
			  error.response = response;
			  if (err_callback) err_callback(error);
		  }
    }).catch((e)=>{
      console.log(e);
    	if (err_callback) err_callback(e);
    })
}
function getRaw(url, cb, err_callback) {
  return myFetch('GET', url, undefined, cb, undefined, err_callback);
}
function get(url, data, cb, err_callback) {
  url = url + '?' + queryString.stringify(data);
  // console.log(url);
  return getRaw(url, cb, err_callback);
}
function delete1(url, data, cb,err_callback) {
  var method = 'DELETE';
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function post(url, data, cb,err_callback) {
  var method = 'POST';
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function put(url, data, cb,err_callback) {
  var method = 'PUT';
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function postOrPut(url, data, cb,err_callback) {
  var method = 'POST';
  if (data.id) {
    method = 'PUT';
  }
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function postForm(url, data, cb,err_callback) {
  var method = 'POST';
  return fetch(url, {
    method: method,
    credentials: 'include',
    body: data,
  }).then((response)=>{
    	  if (response.status >= 200 && response.status < 300) {
    	  	var r = response.json();
		    r.then(cb).catch(err_callback);
		  }
		  else{
			  const error = new Error(`HTTP Error ${response.statusText}`);
			  error.status = response.statusText;
			  error.response = response;
			  err_callback(error);
		  }
  }).catch((e)=>{
    	err_callback(e);
  })

}
function boards(data, cb, err_callback) {
  return get('/board', data, cb, err_callback);
}
function board(data, cb, err_callback) {
  return get('/board/'+data.id, {}, cb, err_callback);
}
function stages(data, cb, err_callback) {
  return get('/stage', data, cb, err_callback);
}
function storys(data, cb, err_callback) {
  return get('/story', data, cb, err_callback);
}
const Client = {
  init: (m, callback) => {
    callback();
  },
  boards,stages,
  board,storys,
  get,put,
  post,
  postOrPut,
  delete1,
  postForm,
};
export default Client;

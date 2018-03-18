import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import rootReducer from './reducers';
import Root from './components/Root';

 const initialState = JSON.parse(window.localStorage.getItem("Store")) || {
  groups: [{
      id: "0",
      name: "Мой день",
  }],
  tasks : [{
    completed:true,
    date:1521391747640,
    groupId:"0",
    id:"0",
    name:"Complete task" },
    {
      completed:false,
      date:1521305354385,
      groupId:"0",
      id:"1",
      name:"Failed task" },
      {
        completed:false,
        date:1521391747640,
        groupId:"0",
        id:"2",
        name:"Task" }]
};
const store = createStore(rootReducer, initialState);

render(<Root store={store} />, document.getElementById('app'));

let unsubscribe = store.subscribe(() =>{
  window.localStorage.setItem("Store", JSON.stringify(store.getState()))
  console.log(store.getState())
}
)

module.hot.accept();
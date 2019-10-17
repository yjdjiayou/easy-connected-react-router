import React, { Component } from 'react'
import {LOCATION_CHANGE} from './constants';
import {ReactReduxContext} from 'react-redux';
// 注意：这里引入的是 react-router
// react-router 实现了路由的核心功能，可以看做是一个路由的基础库，其他路由库都是基于它实现的
// 而 react-router-dom 是浏览器端的 Router
// react-router-dom 是基于 react-router，加入了浏览器操作的一些功能。
// react-router-dom 是浏览器端的 Router
import {Router} from 'react-router';

// ConnectedRouter 内部其实也是用到了 react-router 中的 Router，自身就只是多了一个监听的功能
export default class ConnectedRouter extends Component {
  static contextType = ReactReduxContext
  componentDidMount(){
      // 每当路径发生变化之后，都会执行此监听函数，并传入2个参数：新的路径、新的动作
      // 这里的 action 和 redux 中的 action 没有任何关系，就是一个字符串，常见的有（"PUSH","POP"）
     this.unlistener = this.props.history.listen((location,action)=>{
         // 这里的 dispatch 方法是仓库的方法，而仓库是通过上下文获取的
         this.context.store.dispatch({
            type:LOCATION_CHANGE,
            payload:{location,action}
        });
     });
  }
  componentWillUnmount(){
    this.unlistener();
  }
  render() {
    let {history,children} = this.props;
    // HashRouter 向下层传递 history location match
    return (
      <Router history={history}>
          {children}
      </Router>
    )
  }
}

/**
 * HashRouter就是一个拥有了 hashhistory 的 ReactRouter
 * <Router history={createHashHistory()}><Router>
 */
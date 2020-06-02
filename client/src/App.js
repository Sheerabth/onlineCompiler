import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Editor from './components/Editor';
import AppNavbar from './components/AppNavbar';
import Files from './components/Files';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
export default class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render(){
    return (
      <Provider store={store}>
        <Router>
        <div className="container">
          <div className = "content">
            <AppNavbar />   
            <Switch>
              <Route exact path = "/" component = {Editor} />     
              <Route path = "/files" component = {Files} />
              <Route path = "/login" component = {Login}/>
              <Route path = "/register" component = {Register} /> 
            </Switch>       
          </div>
        </div>
        </Router>
      </Provider>
      
    )
  }
}


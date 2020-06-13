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

  state = {
    darkMode: this.getInitialMode()
  }

  getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const savedMode = JSON.parse(localStorage.getItem('dark'));
    const userPrefersDark = this.getColorScheme();
    if (isReturningUser) {
      return savedMode;
    } else if (userPrefersDark) {
      return true;
    }
    else {
      return false;
    }
  }

  getColorScheme() {
    if (!window.matchMedia) return;

    return window.matchMedia("(prefers-color-scheme: dark").matches
  }

  componentDidMount() {
    store.dispatch(loadUser());
  }

  componentDidUpdate() {
    localStorage.setItem('dark', JSON.stringify(this.state.darkMode))
  }

  toggleMode = () => {
    this.setState({
      darkMode: !this.state.darkMode
    })
  }

  render(){
    return (
      <Provider store={store}>
        <Router>
        <div className={this.state.darkMode ? "dark-mode outer" : "outer" }>
          <div className = "content">
            <AppNavbar darkMode={this.state.darkMode} toggleMode={this.toggleMode}/>   
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


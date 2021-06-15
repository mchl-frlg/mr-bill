import logo from './logo.svg';
import './App.css';
import GoogleCreateAccount from './components/authentication/CreateAccount'
import GoogleLogout from './components/authentication/Logout'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'
import Signup from './components/Signup'
import { clearUser } from './actions'


const App = () => {
  const history = useHistory();
  const activeUser = useSelector(state => state.activeUser)
  
  useEffect(() => {
    history.push(activeUser.name ? "/dashboard" : "/signup")
    }, [activeUser])
  
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Navigation/>
      <header className="App-header">
        <h1 onClick={() => dispatch(clearUser())}>clear user</h1>
        <h1 onClick={() => console.log(activeUser)}>log store</h1>
        <Switch>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/signup" component={Signup}/>
          {/* <Redirect to={activeUser.name ? "/dashboard" : "/signup"} /> */}
        </Switch>
      </header>
    </div>
  );
}

export default App;

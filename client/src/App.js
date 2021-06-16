import './App.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'
import Signup from './components/Signup'
import { clearUser, fetchUser } from './actions'


const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const activeUser = useSelector(state => state.activeUser)
  
  useEffect(() => {
    history.push(activeUser.name ? "/dashboard" : "/signup")
    }, [activeUser])

  // useEffect(() => {
  //   dispatch(fetchUser())
  // }, [])

  return (
    <div className="App">
      <Navigation/>
        <h1 onClick={() => dispatch(clearUser())}>clear user</h1>
        <h1 onClick={() => console.log(activeUser)}>log store</h1>
        <Switch>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/signup" component={Signup}/>
          {/* <Redirect to={activeUser.name ? "/dashboard" : "/signup"} /> */}
        </Switch>

      
    </div>
  );
}

export default App;

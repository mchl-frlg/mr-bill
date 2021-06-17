import './App.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'
import Signup from './components/Signup'
import { clearUser, fetchUser } from './actions'
import { useCookies } from 'react-cookie'


const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const activeUser = useSelector(state => state.activeUser)
  const [cookies, setCookie, removeCookie] = useCookies(['mr-bill-auth']);

  useEffect(() => {
    history.push(activeUser.name ? "/dashboard" : "/signup")
    if(activeUser.name){
      setCookie('mr-bill-auth', activeUser.encryptedToken.iv, {maxAge: 3600})
      }
    }, [activeUser])

  useEffect(() => {
    if(cookies['mr-bill-auth']){
      dispatch(fetchUser({cookie: cookies['mr-bill-auth']}))
    }
  }, [])

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

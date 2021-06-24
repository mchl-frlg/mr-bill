import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard'
import Navigation from './components/Navigation'
import Signup from './components/signup/Signup'
import { fetchUser } from './actions'
import { useCookies } from 'react-cookie'
import Archive from './components/Archive'


const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const activeUser = useSelector(state => state.activeUser)
  const [cookies, setCookie] = useCookies(['mr-bill-auth']);

  useEffect(() => {
    history.push(activeUser.name ? "/dashboard" : "/signup")
    if(activeUser.name){
      setCookie('mr-bill-auth', activeUser.encryptedToken.iv, {maxAge: 3600})
      }
    }, [activeUser.name])

  useEffect(() => {
    if(cookies['mr-bill-auth']){
      dispatch(fetchUser({cookie: cookies['mr-bill-auth']}))
    }
  }, [])

  return (
    <div className="App">
      <Navigation/>
        <Switch>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/archive" component={Archive}/>
        </Switch>
    </div>
  );
}

export default App;

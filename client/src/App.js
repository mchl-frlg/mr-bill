import logo from './logo.svg';
import './App.css';
import GoogleLogin from './components/googleLogin'
import GoogleLogout from './components/googleLogout'
import { useState, useEffect } from 'react';

function App() {
  const [loggedIn, SetLoggedIn] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mr. Bill</h1>
        {loggedIn ? <GoogleLogout setLoggedIn={SetLoggedIn}/> : <GoogleLogin setLoggedIn={SetLoggedIn}/>}
        <p>
          Log in with google to create an account
        </p>
      </header>
    </div>
  );
}

export default App;

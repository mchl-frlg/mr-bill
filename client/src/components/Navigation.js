import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Redirect, Route, Switch, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from './authentication/Login'
import Logout from './authentication/Logout'
import Settings from './Settings'

const Navigation = () => {

  const activeUser = useSelector(state => state.activeUser)

  if (!activeUser.name){
    return (
      <>
        <br/>
        <br/>
        <br/>
      </>
    )
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home" className='brand-box'><img src='./mr-bill-icons/Icon-1-light.png' alt='cartoon'width={65}/><br/><span style={{"fontFamily": "'Courier New', Monospace"}}>Mr. Bill</span></Navbar.Brand>
      <Nav className="ml-auto">
        <NavDropdown title={
          <>
            <img
              className="thumbnail-image"
              src={activeUser.picture}
              alt='user pic'
              style={{
                width: 65,
                borderRadius: 65/2
              }}
              
            />
          </>
        } id="basic-nav-dropdown">
          <NavDropdown.Item>
            <Link to='/dashboard' className='nav-links'>Dashboard</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Settings/>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to='/archive' className='nav-links'>Archive</Link>
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3"><Logout/></NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  )
  
}

export default Navigation
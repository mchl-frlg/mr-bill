import { Navbar, Nav, NavDropdown, FormControl, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import Login from './authentication/Login'

const Navigation = () => {

  const activeUser = useSelector(state => state.activeUser)

  if (!activeUser.name){
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Mr. Bill</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav navbar-right">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Sign Up</Nav.Link>
            <Nav.Link href="#link">Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Mr. Bill</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav navbar-right">
        <Nav className="mr-auto">
          <NavDropdown title={
            <>
              <img
                className="thumbnail-image"
                src={activeUser.picture}
                alt='user pic'
                style={{
                  width: 45,
                  borderRadius: 45/1.7
                }}
                
              />
            </>
          } id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Dashboard</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
  
}

export default Navigation
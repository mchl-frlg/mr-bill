import CreateAccount from './authentication/CreateAccount'
import Carousel from './Carousel'
import Login from './authentication/Login'

const Signup = () => {

  return (
    <>
    <div className='row'>
      <div className= 'col-sm-6 offset-md-3'>
      <img src='./mr-bill-icons/Icon-1-light.png' alt='cartoon'width={300}/>
      <h1 style={{"fontFamily": "'Courier New', Monospace"}}>Mr. Bill</h1>
      <br></br>
      {/* <h3>reminds you of bills and invoices BEFORE they're due</h3>
      <br/> */}
      {/* <h4>Integrated with gmail, secured with google's oauth2 protocol and full encryption</h4>
      <br/>
      <h5>Pick email, or text notifications, sign up now with one click</h5> */}
      <br/>
        
      </div>
    </div>
    <Carousel/>
      <br/>
        <span className='sign-up-button'><CreateAccount/></span><span className='sign-up-button'><Login/></span>
    </>
  )
}

export default Signup
import CreateAccount from '../authentication/CreateAccount'
import Carousel from './Carousel'
import Login from '../authentication/Login'

const Signup = () => {

  return (
    <>
    <div className='row'>
      <div className= 'col-sm-6 offset-md-3'>
        <img src='./mr-bill-icons/Icon-1-light.png' alt='cartoon'width={300}/>
        <h1 style={{"fontFamily": "'Courier New', Monospace"}}>Mr. Bill</h1>
      </div>
    </div>
    <br/>
    <Carousel/>
    <br/>
      <span className='sign-up-button'><CreateAccount/></span><span className='sign-up-button'><Login/></span>
    </>
  )
}

export default Signup
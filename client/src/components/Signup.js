import GoogleCreateAccount from './authentication/CreateAccount'
import Carousel from './Carousel'

const Signup = () => {

  return (
    <>
    <div className='row'>
      <div className= 'col-sm-6 offset-md-3'>
      <h1>SIGNUP CAROUSEL</h1>
      <br></br>
      <Carousel/>
      <GoogleCreateAccount/>
      </div>
    </div>
    </>
  )
}

export default Signup
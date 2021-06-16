import GoogleCreateAccount from './authentication/CreateAccount'
import Carousel from './Carousel'

const Signup = () => {

  return (
    <>
    <div className='row'>
      <div className= 'col-sm-6 offset-md-3'>
      <h1>Mr. Bill</h1>
      <br></br>
      <img
            width={200}
            src='https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg'
            alt='cat'
            />
      <h2>Mr Bill integrates with gmail to remind you of bills and invoices BEFORE they're due.</h2>
      <p>pick notifications: browser, email, or text. secured with google's oauth2 protocol and full encryption. sign up now with one click</p>
      <GoogleCreateAccount/>
      </div>
    </div>
    </>
  )
}

export default Signup
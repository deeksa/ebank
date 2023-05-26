import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const Home = props => {
  const onTapLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }
  return (
    <div className="container11">
      <div className="container10">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button type="button" onClick={onTapLogout}>
          Logout
        </button>
      </div>
      <div className="container12">
        <div>
          <h1 className="para">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
          />
        </div>
      </div>
    </div>
  )
}
export default Home

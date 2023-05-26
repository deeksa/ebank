import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    userInput: '',
    pinInput: '',
    errorMessage: '',
  }

  onSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  onFailure = error => {
    this.setState({
      errorMessage: error,
    })
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/ebank/login'
    const {userInput, pinInput} = this.state
    const loginObj = {
      userInput,
      pinInput,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(loginObj),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  onChangePassword = e => {
    this.setState({
      pinInput: e.target.value,
    })
  }

  onChangeInput = e => {
    this.setState({
      userInput: e.target.value,
    })
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {userInput, pinInput, errorMessage} = this.state
    console.log(errorMessage)
    return (
      <div className="container1">
        <div className="container2">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="image1"
          />
          <div className="container3">
            <h1>Welcome Back!</h1>
            <form onSubmit={this.onFormSubmit}>
              <label>
                User Id
                <br />
                <input
                  type="text"
                  value={userInput}
                  placeholder="Enter User Id"
                  onChange={this.onChangeInput}
                />
              </label>
              <br />
              <label>
                PIN
                <br />
                <input
                  type="password"
                  value={pinInput}
                  placeholder="Enter PIN"
                  onChange={this.onChangePassword}
                />
              </label>
              <br />
              <button type="submit">Login</button>
              {errorMessage !== '' ? <p>{errorMessage}</p> : null}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginForm

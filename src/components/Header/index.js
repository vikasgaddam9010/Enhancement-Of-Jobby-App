import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'

import {IoBagHandleSharp} from 'react-icons/io5'

import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickToLogOut = () => {
    Cookies.remove('jwt')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div className="d-flex-header d-none-sm">
        <ul className="d-flex-header">
          <li>
            <Link className="link" to="/">
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link className="link" to="/jobs">
              <p>Jobs</p>
            </Link>
          </li>
        </ul>
      </div>
      <button
        type="button"
        onClick={onClickToLogOut}
        className="logout-btn d-none-sm"
      >
        Logout
      </button>
      <ul className="icons-container">
        <li key="1">
          <Link className="link" to="/">
            <AiFillHome />
          </Link>
        </li>
        <li key="2">
          <Link className="link" to="/jobs">
            <IoBagHandleSharp />
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="btn-ioc-log-out"
            onClick={onClickToLogOut}
          >
            <FiLogOut aria-label="close" />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <div className="nav-mobile-icons-container">
            <Link to="/" className="nav-link">
              <button type="button" className="nav-mobile-btn">
                <AiFillHome className="mobile-nav-bar-icons" />
              </button>
            </Link>
            <Link to="/jobs" className="nav-link">
              <button type="button" className="nav-mobile-btn">
                <BsFillBriefcaseFill className="mobile-nav-bar-icons" />
              </button>
            </Link>

            <button
              type="button"
              className="nav-mobile-btn"
              onClick={onClickLogout}
            >
              <FiLogOut className="mobile-nav-bar-icons" />
            </button>
          </div>
        </div>
        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <div className="nav-menu-container">
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/jobs" className="nav-link">
                  Jobs
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)

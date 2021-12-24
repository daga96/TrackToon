import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from 'react-scroll';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom'
import { useHistory } from "react-router";
import ProfileDropbar from "./ProfileDropbar";



export default function Navbar() {

  const [state, setState] = useState(false)
  const { currentUser, logout } = useAuth()
  const [click, setClick] = useState(false);
  const history = useHistory()
  const [dropdown, setDropdown] = useState(false);
  const [error, setError]=useState("")

  const location = useLocation();

  async function handleLogout() {
    setError("")

    try {
    await logout()
    history.push("/")
    handleClick()
    } catch {
    setError("Failed to log out")
    }
}
  function handleClick() {
    setState(!state)
  }
  function handleProfileClick() {
    setClick(!click)
  }
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  


  return (
    <nav className="NavbarItems" id="navbar-items">
      <Link to="/" ><span className="navbar-logo"><img src="/logo.svg" alt="TrackToon" className="logo-icon" /><h1 className="web-name">TrackToon</h1></span></Link>
      <div className="menu-icon" onClick={handleClick}>
        <i className={state ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={state ? 'nav-menu active' : 'nav-menu'} >

        <li onClick={handleClick}>
          <Link to="/" className="nav-links">
            Home
                </Link>
        </li>
        {location.pathname === "/"
          ? <li onClick={handleClick}>
            <LinkScroll to="features" smooth={true} className="nav-links">
              Features
                </LinkScroll>
          </li>
          :
          <li onClick={handleClick}>
            <Link to="/" className="nav-links">
              Features
                </Link>
          </li>
        }

        {<li onClick={handleClick}>
            <Link to="/browse/all" className="nav-links">
              Browse
              </Link>
          </li>
        }


        {currentUser !== null
          ?
          <>
          <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
            <Link to="/profile" className="nav-links" onClick={handleClick} >Profile</Link>
            <i className='fas fa-caret-down' onClick={handleProfileClick} />
            {dropdown && <ProfileDropbar />}
          </li>
          <li onClick={handleLogout} className="nav-logout">
            <i className="fas fa-sign-out-alt"></i>
               Logout
            </li>           
      
          </>
          :
          <>
            <li onClick={handleClick}>
              <Link to="/login" className="nav-links">
                Login
                </Link>
            </li>
            <li onClick={handleClick}>
              <Link to="/signup" className="nav-links-mobile">
                Sign Up
                </Link>
            </li>
          </>
        }


      </ul>

    </nav>
  )
}

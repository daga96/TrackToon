import React, { useState } from 'react';
import './ProfileDropbar.css';
import { Link } from 'react-router-dom';
import { useAuth} from '../../contexts/AuthContext';
import { useHistory } from "react-router";


function ProfileDropbar () {
  const [click, setClick] = useState(false);
  const [error, setError] = useState("")
  const { logout } = useAuth() 
  const history = useHistory()


  const handleProfileClick = () => setClick(!click);
 
    
    async function handleLogout() {
        setError("")
    
        try {
        await logout()
        history.push("/")
        } catch {
        setError("Failed to log out")
        }
  }

  return (
    <>
      <ul onClick={ handleProfileClick} className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
            <li onClick={ handleProfileClick}>
           
                 <Link to="/profile" className="nav-links-profile">
                 <i className="fas fa-user-alt" ></i>
                       Profile
                </Link>                
            </li>
            
            <li onClick={handleLogout} className="nav-links-profile">
            <i className="fas fa-sign-out-alt"></i>
               Logout
            </li>            
      </ul>
    </>
  );
}

export default ProfileDropbar;
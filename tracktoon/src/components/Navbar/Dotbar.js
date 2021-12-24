import { Link as LinkScroll} from 'react-scroll';
import React, { Component } from "react";
import "./Dotbar.css"

class Dotbar extends Component{
    state = {clicked: false }
    handleClick =()=>{
      this.setState({clicked: !this.state.clicked})
    }
   
    
    render()
    {
      return(
<div className="dotnav">
    <ul>
        <li className="dot-list">
            <LinkScroll to="navbar-items" smooth={true} activeClass="active" spy={true}><i className="fas fa-circle"></i></LinkScroll>
        </li>
        <li className="dot-list">
           
            <LinkScroll to="features" smooth={true} activeClass="active"  spy={true} ><i className="fas fa-circle"></i></LinkScroll>
        </li>
       
    </ul>
</div>

)
}
}

export default Dotbar;
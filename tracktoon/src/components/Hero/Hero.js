import "./Hero.css"
import { useAuth } from "../../contexts/AuthContext";
import {Link} from "react-router-dom"

const Hero = () => (
    
    <div className="hero" id="hero">
        
      
        <div className="hero-back">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#292929" fillOpacity="1" d="M0,64L34.3,85.3C68.6,107,137,149,206,176C274.3,203,343,213,411,197.3C480,181,549,139,617,133.3C685.7,128,754,160,823,160C891.4,160,960,128,1029,101.3C1097.1,75,1166,53,1234,42.7C1302.9,32,1371,32,1406,32L1440,32L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path>
</svg>
        <div className="text-center">
                
                <h2>JOIN US</h2>
                    <h1>나의 웹툰 기록</h1> 
                    <p>
                    Tracktoon is a great place to track the webtoons you have read or are planning to read. 
                    </p>
                    {useAuth().currentUser!==null
                    ?  <Link to="/profile" className="signup"> PROFILE &gt;</Link>
                    :  <Link to="/signup" className="signup"> SIGN UP &gt;</Link>
                    }
                </div>
                
        
        
           
        </div>
      </div>
   
);

      

  export default Hero;
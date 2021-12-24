import "./Login.css";
import React,{useState, useRef} from "react";
import LoginReset from "./LoginReset";
import Signup from "../Signup/Signup";
import {BrowserRouter as Router,Route,Link,Switch} from "react-router-dom";
import FadeIn from 'react-fade-in';
import {useHistory} from "react-router-dom"
import {useAuth} from '../../contexts/AuthContext'

export default function Login() {
  const email = useRef()
  const password = useRef()
  const {login} =useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading]=useState(false)
  const history = useHistory()
  
  async function submitHandler(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(email.current.value, password.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }
        
   
return (
    <div className="login-main">
    <FadeIn transitionDuration="1000" delay="100">
    <div className="container-form" >
            <div className="right-container">
                <form onSubmit={submitHandler}>
                    <h1>이메일 주소로 로그인</h1>   
                    <input type="text" placeholder="이메일" name="email" ref={email} required/>
                    <input type="password" placeholder="비밀번호" name="password" ref={password} required />
                      <div className="id-pswd">
                        <div className="setting-links">
                        <Link to="/login/reset" className="forgot-password">비밀번호 재설정</Link>
                        </div>
                      </div>
                      {error !== null && <div className = "error-message">{error}</div>}
                    
                    
                    <button  disabled={loading} className="login-button" type="submit">LOGIN</button>
                    <span>TrackToon 계정을 없으신가요? <a href="/signup"> Sign up </a></span>
                
                    <Router>
                      <Switch>
                        <Route path="/login/reset" exact component={()=> <LoginReset /> } />
                        <Route path="/signup" exact component={()=> <Signup/> } />
                      </Switch>
                    </Router>
                    
                    
                    </form>
            </div>  
            
           
        </div>
    </FadeIn>
    </div>  
);

};

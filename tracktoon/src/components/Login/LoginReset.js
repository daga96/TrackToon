import "./Login.css"
import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import {auth} from '../../firebaseConfig';
import FadeIn from 'react-fade-in';

export default function LoginReset(){
    const history = useHistory()
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState(null);
    
    const changeHandler = e => {
        const { name, value } = e.currentTarget;
        if (name === "email") {
        setEmail(value);
        }
    };
    const sendResetEmail = e => {
       /* e.preventDefault();*/
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailSent(true);
        setTimeout(() => {setEmailSent(false)}, 3000);
        history.goBack();

      })
      .catch(() => {
        setError("Error resetting password");
      });
  };
    
return (

      <div className="forgot-main">
        <FadeIn transitionDuration="1000" delay="100">
        <div className="password-reset">
           <div className="header-reset"> <i className='fas fa-times' onClick={()=>{history.goBack()}}></i></div>
           <div className="reset-input" >
                
                <h1>비밀번호 재설정</h1>
                <input type="text" placeholder="이메일" name="email" value={email} onChange={changeHandler}/>
                <button className="login-button" onClick={()=>sendResetEmail()} >확인</button>
               
            </div>

        </div>
        </FadeIn>
      </div>
        )

 }

import "./Signup.css";
import React, { useRef, useState } from "react";
import FadeIn from 'react-fade-in';
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from "react-router";

export default function Signup() {

    const ID = useRef()
    const email = useRef()
    const password = useRef()
    const password2 = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    

    async function submitHandler(e) {
        e.preventDefault()

        if (password.current.value !== password2.current.value) {
            return setError("비밀번호가 일치하지 않습니다.")
        }
        try {
            setError('')
            setLoading(true)
            await signup(email.current.value, password.current.value, ID.current.value)
            history.push('/')
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }
    
  

    return (
        <div className="signup-main">
            <FadeIn transitionDuration="1000" delay="100">
                <div className="container-form" >
                    <div className="right-container">
                        <form onSubmit={submitHandler}>
                            <h1>회원가입</h1>
                            <input type="text" placeholder="ID" name="ID" ref={ID} required />
                            <input type="email" placeholder="이메일" name="email" ref={email} required />
                            <input type="password" placeholder="비밀번호 (8글자 이상)" name="password" minLength="8" ref={password} required />
                            <input type="password" placeholder="비밀번호 확인" name="password2" ref={password2} required />
                            {error !== null && <div className="error-message"> {error}</div>}

                            <button disabled={loading} className="signup-button" type="submit" > SIGN UP</button>
                            <span>TrackToon 계정을 가지고 계신가요? <a href="/login"> Login in </a></span>
                        </form>
                    </div>
                </div>
            </FadeIn>
        </div>
    );

};


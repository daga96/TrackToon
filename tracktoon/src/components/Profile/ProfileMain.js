import "./ProfileMain.css";
import React, {useState, useRef } from "react";
import { useAuth } from '../../contexts/AuthContext'
import firebaseConfig from "../.././firebaseConfig"
import { Link } from "react-router-dom";
import FadeIn from 'react-fade-in';
import { useHistory } from "react-router";


export default function Profile() {

  const { currentUser} = useAuth()
  var username = ""
  const [count, setCount] = useState()
  const [complete, setComplete] = useState()
  const [reading, setReading] = useState()
  const [ongoing, setOngoing] = useState()
  const [dropped, setDropped] = useState()
  const history = useHistory()

  const readUsername = () => {
    firebaseConfig.database().ref('users/' + currentUser.uid)
      .on('value', (snapshot) => { username = snapshot.val().ID })
    return username
  }

  const countAll = () => {
    firebaseConfig.firestore().collection("listItems").doc(currentUser.uid)
      .collection("webtoonItems").get()
      .then((snap) => { setCount(snap.size) })
    return count
  }
  const countCompleted = () => {
    firebaseConfig.firestore().collection("listItems").doc(currentUser.uid)
      .collection("webtoonItems").where('status', '==', 'completed').get()
      .then((snap) => { setComplete(snap.size) })
    return complete
  }

  const countReading = () => {
    firebaseConfig.firestore().collection("listItems").doc(currentUser.uid)
      .collection("webtoonItems").where('status', '==', 'reading').get()
      .then((snap) => { setReading(snap.size) })
    return reading
  }

  const countOnGoing = () => {
    firebaseConfig.firestore().collection("listItems").doc(currentUser.uid)
      .collection("webtoonItems").where('status', '==', 'on-hold').get()
      .then((snap) => { setOngoing(snap.size) })
    return ongoing
  }

  const countDropped = () => {
    firebaseConfig.firestore().collection("listItems").doc(currentUser.uid)
      .collection("webtoonItems").where('status', '==', 'dropped').get()
      .then((snap) => { setDropped(snap.size) })
    return dropped
  }

  const [addList, setAddList]=useState()
  const title = useRef()
  const addListHandle=()=>{
    setAddList(!addList)
  }


  return (
    <>
      <div className="profile-main">


        <div className="profile-header">
          <div className="profile-about">
            <div className="profile-user-info">
              <div className="name-box">
                <h2> {readUsername()} </h2>
              </div>
              {currentUser.email}

            </div>
          </div>
          <div className="profile-content">
            <div className="profile-left">
              <h3>My Statistics</h3> 
              <div className="stat-element">
                <div className="title-el"> Total </div>
                <div className="count-el">{countAll()}</div>
              </div>

              <div className="stat-main">
                <div className="title-stat">
                  <ul className="stat-option">
                    <li>Completed</li>
                    <li>Reading</li>
                    <li>On-going</li>
                    <li>Dropped</li>
                  </ul>
                </div>

                <div className="stat-numbers">
                  <ul className="stat-values">
                    <li className="comp-val" >{countCompleted()}</li>
                    <li className="read-val">{countReading()}</li>
                    <li className="on-val">{countOnGoing()}</li>
                    <li className="drop-val">{countDropped()}</li>
                  </ul>
                </div>

              </div>



            </div>
            <div className="profile-right">
            <div className="filler"><i class="fas fa-list"></i></div>
              <div className="list-link"> 
              
              <Link to="/list" className="link-dir" >My list</Link>
              </div>
             
            </div>
          </div>

        </div>
      </div>

    </>
  )
}
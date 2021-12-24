import React, { useState, useEffect, useRef } from 'react'
import "./list.css"
import { useAuth } from '../../contexts/AuthContext'
import firebaseConfig from "../../firebaseConfig"
import FadeIn from 'react-fade-in';
import { useHistory } from "react-router";

function List() {

    const [titleQuery, setTitleQuery] = useState("");
    const [statusQuery, setStatusQuery] = useState("");
    const [platformQuery, setPlatformQuery] = useState("");
    const [currentWebtoon, setCurrentWebtoon] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const history=useHistory()
    

    const setActiveWebtoon = (webtoon, index) => {
        const { id } = webtoon;

        setCurrentWebtoon({
            key: webtoon.key,
            id,
        });

        setCurrentIndex(index);
        deleteHandle()

    };

    const setActive = (webtoon, index) => {
        const { id, title, author, chapters, genre, photoURL, platform } = webtoon;

        setCurrentWebtoon({
            key: webtoon.key,
            id,
            title,
            author,
            chapters,
            genre,
            photoURL,
            platform
        });

        setCurrentIndex(index);

        editHandle()
    }

    const onTitleChange = (e) => {
        e.preventDefault();

        setTitleQuery(e.target.value);

    };
    const onStatusChange = (e) => {
        e.preventDefault();

        setStatusQuery(e.target.value);

    };

    const onPlatformChange = (e) => {
        e.preventDefault();

        setPlatformQuery(e.target.value);

    };


    const [deleteState, setDeleteState] = useState(false);
    const [editState, setEditState] = useState(false);
    const { currentUser } = useAuth();
    const status = useRef()
    const progress = useRef()

    function deleteHandle() {

        setDeleteState(!deleteState)


    }
    function deleteItem() {
        firebaseConfig.firestore().collection('listItems').doc(currentUser.uid).collection("webtoonItems").doc(currentWebtoon.id).delete()
        deleteHandle()

    }

    function editHandle() {
        setEditState(!editState)

    }


    const submitToList = (event) => {
        event.preventDefault();

        firebaseConfig.firestore().collection("listItems").doc(currentUser.uid).collection("webtoonItems").doc(currentWebtoon.id).set
            ({
                title: currentWebtoon.title,
                platform: currentWebtoon.platform,
                photoURL: currentWebtoon.photoURL,
                status: status.current.value,
                progress: progress.current.value


            }); editHandle()
    }


    function ReadWebtoonList() {
        const [lists, setLists] = useState([]);

      
        useEffect(() => {
            firebaseConfig.firestore().collection("listItems").doc(currentUser.uid).collection("webtoonItems")
                .onSnapshot(snapshot => {
                    const lists = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    setLists(lists)
                })
        }, [])
        return lists

    }

    if(currentUser){
    var userLists = ReadWebtoonList()
    }
    else {
        alert("Please Login")
        history.push("/login")
    }


    if (titleQuery.length > 0) {
        userLists = userLists.filter((i) => {
            return i.title[0].match(titleQuery);
        })
    }
    if (statusQuery) {

        userLists = userLists.filter((i) => {
            if (statusQuery == "all") {
                return userLists
            }
            else {
                return i.status.match(statusQuery);
            }

        })

    }

    if (platformQuery.length > 0) {

        userLists = userLists.filter((i) => {
            return i.platform[0].match(platformQuery);
        })
    }



    return (
        <>


            {currentUser ? editState && <div className="webtoonDetails">
                <FadeIn transitionDuration="1000" delay="100">

                    <div className="webtoonDetailsBox">
                        <i className="fas fa-times" onClick={() => editHandle()}></i>
                        <div className="webtoonDetailsUp">
                            <img src={currentWebtoon.photoURL}></img>
                            <div className="mainInfo">
                                <h2>{currentWebtoon.title} </h2>
                                <p>{currentWebtoon.author}</p>
                            </div>
                        </div>
                        <div className="webtoonDetailsDown">

                            <div className="formFilter">
                                <label>Status</label>

                                <select className="status" ref={status}>
                                    <option value="reading">reading</option>
                                    <option value="on-hold">on-hold</option>
                                    <option value="completed">completed</option>
                                    <option value="dropped">dropped</option>
                                </select>


                                <label>Progress</label>
                                <input type="number" min="0" max={currentWebtoon.chapters} ref={progress} defaultValue={0}></input>
                                <div className="buttons">
                                    <button className="cancelButton" onClick={() => editHandle()}>Cancel</button>
                                    <button className="submitButton" type="submit" onClick={submitToList}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </FadeIn>
            </div> : 
            
         history.push("/login")
            
         
            }

            {currentUser ? deleteState && <div className="deletePrompt">
                <FadeIn transitionDuration="1000" delay="100">
                    <div className="deleteDetail">
                        <h3>DELETE</h3>
                        <p className="text">Are you sure you want to delete this list entry? </p>
                        <div className="buttons">
                            <button className="buttonDelete" onClick={() => deleteItem()}>Delete</button>
                            <button className="buttonCancel" onClick={() => deleteHandle()}>Cancel</button>
                        </div>
                    </div>
                </FadeIn>
            </div> :
            history.push("/login")
            }
           
            <div className="list-content">

                <div className="filters">

                    <div className="filter-search">
                        <div className="name"> 제목 </div>
                        <input type="search" autoComplete="off" className="search" value={titleQuery} onChange={onTitleChange} />
                    </div>
                    <div className="filter-search">
                        <div className="name"> 상태 </div>

                        <select className="status" ref={status} value={statusQuery} onChange={onStatusChange}>
                            <option value="all"> all </option>
                            <option value="reading">reading</option>
                            <option value="on-hold">on-hold</option>
                            <option value="completed">completed</option>
                            <option value="dropped">dropped</option>
                        </select>


                    </div>
                    <div className="filter-search">
                        <div className="name">플랫폼</div>
                        <input type="search" autoComplete="off" className="search" value={platformQuery} onChange={onPlatformChange} />
                    </div>

                </div>
                <p className="titleBar">My List</p>

                <div className="list-head">

                    <div className="title">제목</div>
                    <div className="progress">진행</div>
                    <div className="status">상태</div>
                    <div className="plat">플랫폼</div>
                </div>
                <div className="list-main">

                    <ul className="list-elements">
                    <FadeIn>
                        {userLists && userLists.map((usrList, index) => {
                            return (
                                <li key={usrList.id} className="element">
                                    <div><img src={usrList.photoURL}></img></div>
                                    <div className="elementTitle">{usrList.title}</div>
                                    <div className="elementPro">{usrList.progress}화</div>
                                    <div className="elementStat">{usrList.status}</div>
                                    <div className="elementPlat">{usrList.platform}</div>
                                    <div className="options"> <button className=" delete-button "onClick={() => setActiveWebtoon(usrList, index)} > 삭제</button>  <button className="edit-button" onClick={() => setActive(usrList, index)}>편집</button></div>
                                </li>

                            )
                        })}
                  </FadeIn>

                    </ul>
                </div>
                <a href="/profile" className="to-profile"><i className="fas fa-arrow-left"></i>Go back </a>
            </div>
           
        </>
    )


};

export default List
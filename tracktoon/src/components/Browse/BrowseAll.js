import React, { useState, useEffect, useRef } from 'react'
import './Browse.css'
import firebaseConfig from "../../firebaseConfig"
import FadeIn from 'react-fade-in';
import { useAuth } from '../../contexts/AuthContext'
import {useInfiniteScroll} from "./useInfiniteScroll";



function Search() {
  const [query, setQuery] = useState("");
  const [authorQuery, setAuthorQuery] = useState("");
  const [genresQuery, setGenresQuery] = useState("");
  const [platformQuery, setPlatformQuery] = useState("");
  const [modalState, setModalState] = useState(false);

  //modalWindowHandler for Browse 
  const modalStateHandle = () => {

    setModalState(!modalState)
  }
  //setting value for search, author, genres and platform
  const onChange = (e) => {
    e.preventDefault();

    setQuery(e.target.value);

  };

  const onAuthorChange = (e) => {
    e.preventDefault();
    setAuthorQuery(e.target.value);
  }

  const onGenreChange = (e) => {
    e.preventDefault();
    setGenresQuery(e.target.value);
  }
  const onPlatformChange = (e) => {
    e.preventDefault();
    setPlatformQuery(e.target.value);
  }
  const dbRef = firebaseConfig.firestore().collection("webtoons");
 
  //getting webtoons from DB
  function useWebtoonLists() {
    const [lists, setLists] = useState([])
  

    useEffect(() => {
      dbRef.get().then(snapshot => {
          const lists = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
           
          }))
          
          setLists(lists)
        })
    }, [])
    return lists
  }

  var lists = useWebtoonLists()
  



  if (query.length > 0) {
    lists = lists.filter((i) => {
      return i.title[0].match(query);
    })
  }

  if (authorQuery.length > 0) {
    lists = lists.filter((i) => {
      return i.author[0].match(authorQuery);
    })
  }
  if (genresQuery.length > 0) {
    lists = lists.filter((i) => {
      return i.genres[0].match(genresQuery);
    })
  }
  if (platformQuery.length > 0) {
    lists = lists.filter((i) => {
      return i.platform[0].match(platformQuery);
    })
  }



  const [currentWebtoon, setCurrentWebtoon] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const status = useRef()
  const progress = useRef()

  const setActiveWebtoon = (webtoon, index) => {
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
    modalStateHandle();
    setCurrentIndex(index);
  };

  const { currentUser } = useAuth()

  const submitToList = (event) => {
    event.preventDefault();

    
    firebaseConfig.firestore().collection("listItems").doc(currentUser.uid).collection("webtoonItems").doc(currentWebtoon.id).set
      ({
        title: currentWebtoon.title,
        platform: currentWebtoon.platform,
        photoURL: currentWebtoon.photoURL,
        status: status.current.value,
        progress: progress.current.value


      }); modalStateHandle()
  }

let infiniteScroll = useInfiniteScroll();


  return (
    <div className="browse-main">

      {currentUser ? modalState && <div className="webtoonDetails">
        <FadeIn transitionDuration="1000" delay="100">

          <div className="webtoonDetailsBox">
            <i className="fas fa-times" onClick={() => modalStateHandle()}></i>
            <div className="webtoonDetailsUp">
              <img src={currentWebtoon.photoURL} alt="webtoonPhoto"></img>
              <div className="mainInfo">
                <h2>{currentWebtoon.title} </h2>
                <p>{currentWebtoon.author}</p>
                <p>{currentWebtoon.chapters} 화</p>
              </div>
            </div>
            <div className="webtoonDetailsDown">


              <label>Status</label>

              <select className="status" ref={status} >
                <option value="reading">reading</option>
                <option value="on-hold">on-hold</option>
                <option value="completed">completed</option>
                <option value="dropped">dropped</option>
              </select>

            

              <label>Progress</label>
              <input type="number" min="0" max={currentWebtoon.chapters} ref={progress} defaultValue="0"></input>

              <button className="submit-button" type="submit" onClick={submitToList}>Save</button>
            </div>
          </div>

        </FadeIn>
      </div> :
        window.alert("Please Login")
      }
      <div className="search-wrap">
        <div className="filter-search">
          <div className="name"> Search </div>
          <input type="search" autoComplete="off" className="search" value={query} onChange={onChange}>

          </input>
        </div>
        <div className="filter-search">
          <div className="name"> Author </div>
          <input type="search" autoComplete="off" className="filter" value={authorQuery} onChange={onAuthorChange}></input>
        </div>
        <div className="filter-search">
          <div className="name"> Genres </div>
          <input type="search" autoComplete="off" className="filter" placeholder="Any" value={genresQuery} onChange={onGenreChange}></input>

        </div>
        <div className="filter-search">
          <div className="name"> Platform </div>
          <input type="search" autoComplete="off" className="filter" placeholder="Any" value={platformQuery} onChange={onPlatformChange}></input>
        </div>

      </div>
      <h3 className="title-main">BROWSE</h3>

      <div className="result-main">

        {lists && lists.slice(0, infiniteScroll).map((list, index) => {

          return (
            <FadeIn>
            <div key={list.id} list={list}>

              <div className="poster"><img alt="poster" src={list.photoURL} />

                <div className="hover-data">
                  <div className="title-hover">{list.title} </div>
                  <div className="authors">작가: {list.author} </div>
                  <div className="platform">{list.platform} </div>
                  <div className="chapters">{list.chapters}화 </div>
                  <div className="genres"> {list.genres}</div>

                </div>

                <i className="fas fa-plus-circle" onClick={() => setActiveWebtoon(list, index)}>


                </i>

              </div>
              <div className="title">{index.title}</div>

            </div>
            </FadeIn>

          )
        
        })

        }
       

      </div>


    </div>

  )
}

export default Search
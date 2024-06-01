import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import styles from "./Homepage.module.css"
import Card from './Card/Card';
import ListElement from './ListElement';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch } from 'react-redux';
import { allQueues, getNearby } from '../../../redux/actions/LayoutAction';
import { useSelector } from 'react-redux/es/exports';
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions';

const HomePage = () => {
  const [loc, setLoc] = useState({
    lat: 0,
    long: 0
  });

  useEffect(() => {
    let user = localStorage.getItem("userid")
    console.log(user);
    if (user === null) {
      console.log("here");
      // navigate("/login")
    }
  }, []);

  const [ searchedTermForNearby, setSearchedTermForNearby ] = useState("");

  const [state, setState] = useState([]);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log(parseFloat(loc.lat), parseFloat(loc.long));
      dispatch(getNearby(parseFloat(loc.lat), parseFloat(loc.long)))

    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  function showPosition(position) {
    setLoc({ lat: position.coords.latitude, long: position.coords.longitude });
  };

  const dispatch = useDispatch();
  const nearby = useSelector((state) => state.LayoutReducer).nearby;
  const queues = useSelector(state => state.LayoutReducer).allQueues;

  useEffect(() => {
    getLocation();

    dispatch(setLoader());

    dispatch(getNearby(parseFloat(loc.lat), parseFloat(loc.long)))
      .then(() => {
        dispatch(UnsetLoader())
      })
  }, [navigator.geolocation])

  useEffect(() => {
    dispatch(setLoader())

    dispatch(allQueues())
      .then((res) => {
        console.log(res)
        setState(res)
        dispatch(UnsetLoader())
      });
  }, []);

  const filteredNearby = nearby.length > 0 ? nearby.filter((item) => {
    return item.shop.name.toLocaleLowerCase().includes(searchedTermForNearby.toLocaleLowerCase())
  }) : [];

  return (
    <>
      <Navbar />

      <SearchBar  
        searchedTermForNearby={searchedTermForNearby}
        setSearchedTermForNearby={setSearchedTermForNearby}
      />

      <div style={{ padding: 20, marginTop: 16 }}>
        <h1 className={styles.mainHead}>Nearby Stores</h1>

        <div className={styles.cards}>
          {filteredNearby.length === 0 ? <button onClick={getLocation}>Show Nearby</button> : ""}
          {filteredNearby.length !== 0 ? filteredNearby.map(n => {
            return <Card n={n.shop} />
          }) : <></>}
        </div>

        <h1 className={styles.mainHead}>Queues Joined</h1>

        <div style={{ marginTop: 16 }}>
          {queues.length === 0 ? <div className={styles.listElement}>Join some queues!!!</div> : <></>}
        
          {state.map(x => {
            return <ListElement x={x} state={state} setState={setState} />
          })}
        </div>
      </div>
    </>
  )
}

export default HomePage
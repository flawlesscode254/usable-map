import * as React from 'react';
import { useState ,useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import './App.css'
import 'reactjs-popup/dist/index.css';
import { db } from './Firebase'
import Use from '../src/Use'

 
function Map() {
  const [messages, setMessages] = useState([])

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: -0.368361,
    longitude: 35.282196,
    zoom: 15
  });

  useEffect(() => {
  db.collection('coordinates')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => (
          {
            id: doc.id, 
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            city: doc.data().city,
            parking: doc.data().parking,
            spaces: doc.data().spaces
          })))
  }) 
  }, [])

  
  
  return (
    <div>
       <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/duncanii/ckjwkgecw041h17pcso3otkn3"
      mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      
      {messages.map(({latitude, longitude, city, parking, spaces}) => (
          <Use
            latitude={latitude}
            longitude={longitude}
            city={city}
            parking={parking}
            spaces={spaces}
          />
      ))}
      </ReactMapGL>
    </div>
   
  );
}

export default Map
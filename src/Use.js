import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import { Marker } from 'react-map-gl'
import { db } from './Firebase'
import './App.css'

function Use({ latitude, longitude, parking, city}) {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [plate, setPlate] = useState('')
    const [pin, setPin] = useState('')

    const security =  Math.floor((Math.random()*1000000)+1);

    const sendMessage = (event) => {
        event.preventDefault();
        db.collection('orders').add({
          name: name,
          phone: phone,
          city: city,
          parking: parking,
          email: email,
          plate: plate,
          pin: pin,
          code: security
        })
        .then(
          setName(''),
          setPhone(''),
          setEmail(''),
          setPlate(''),
          setPin(''),
        )
        .catch(error => {
          alert(error.message)
        })
      }
    
    return (
        <div>
            <Marker latitude={latitude} longitude={longitude} offsetLeft={-12} offsetTop={-24}>
                <div className="marker">
                  <p style={{opacity: 0}}>{parking}</p>
                  <p style={{opacity: 0}}>{city}</p>
                <Popup contentStyle={{
                    borderRadius: 25,
                    padding: 35,
                }} trigger={
                <img src="https://img.icons8.com/color/48/fa314a/marker--v2.png" alt="marker"/>
                } position="right center" modal nested>
                <div className="form_one">
                    <form action="" className="form_one" onSubmit={sendMessage}>
                    <p>Archives Parking</p>
                    <input value={name} onChange={(e) => {setName(e.target.value)}} className="fill" type="text" placeholder="Enter name"/>
                    <input value={phone} onChange={(e) => {setPhone(e.target.value)}} className="fill" type="text" placeholder="Enter phone number"/>
                    <input value={email} onChange={(e) => {setEmail(e.target.value)}} className="fill" type="text" placeholder="Enter email address"/>
                    <input value={plate} onChange={(e) => {setPlate(e.target.value)}} type="text" className="fill" placeholder="Enter car plate number"/>
                    <input value={pin} onChange={(e) => {setPin(e.target.value)}} className="fill" placeholder="Enter a pin" type="text"/>
                    <input className="pile" type="submit" value="Submit"/>
                    </form>
                </div>
                </Popup>  
                </div>
            </Marker>
        </div>
    )
}

export default Use

import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';
import { Marker } from 'react-map-gl'
import { db } from './Firebase'
import './App.css'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'

function Use({ latitude, longitude, parking, city, spaces}) {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [plate, setPlate] = useState('')
    const [pin, setPin] = useState('')
    const [button, buttonStatus] = useState(true)

    const security =  Math.floor((Math.random()*1000000)+1);
    const decrement = firebase.firestore.FieldValue.increment(-1);

    useEffect(() => {
      (name && phone && email && plate && pin) ? buttonStatus(false) : buttonStatus(true)
    }, [name, phone, email, plate, pin])

    const weird = () => {
      db.collection('coordinates').doc(parking).update({
        spaces: decrement
      })
    }

    const sendMessage = async (event) => {
        await event.preventDefault();
        await db.collection('orders').doc(email).set({
          name: name,
          phone: phone,
          city: city,
          parking: parking,
          email: email,
          plate: plate,
          pin: pin,
          code: security,
          state: "Space Booked",
          time: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(
          setName(''),
          setPhone(''),
          setEmail(''),
          setPlate(''),
          setPin(''),
          weird()
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
                  <p style={{opacity: 0}}>{spaces}</p>
                <Popup contentStyle={{
                    borderRadius: 25,
                    padding: 35,
                }} trigger={
                <img src="https://img.icons8.com/color/48/fa314a/marker--v2.png" alt="marker"/>
                } position="right center" modal nested>
                <div className="form_one">
                    <form action="" className="form_one" onSubmit={sendMessage}>
                    <p>{parking}</p>
                    <p>{city}</p>
                    <p style={{color: "red"}}>{spaces + ` Spaces Available`}</p>
                    <input value={name} onChange={(e) => {setName(e.target.value)}} className="fill" type="text" placeholder="Enter name"/>
                    <input value={phone} onChange={(e) => {setPhone(e.target.value)}} className="fill" type="text" placeholder="Enter phone number"/>
                    <input value={email} onChange={(e) => {setEmail(e.target.value)}} className="fill" type="text" placeholder="Enter email address"/>
                    <input value={plate} onChange={(e) => {setPlate(e.target.value)}} type="text" className="fill" placeholder="Enter car plate number"/>
                    <input value={pin} onChange={(e) => {setPin(e.target.value)}} className="fill" placeholder="Enter a pin" type="text"/>
                    <Button disabled={button} variant="contained" color="secondary" className="pile" type="submit">Submit</Button>
                    </form>
                </div>
                </Popup>  
                </div>
            </Marker>
        </div>
    )
}

export default Use

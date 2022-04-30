import React, { useState } from 'react'
import { getFirestore, collection, getDocs, addDoc, Timestamp } from 'firebase/firestore/lite';
import { db } from '../services/firebase';
function CommonNumberScreen() {

  const [inputField, setInputField] = useState({
    provider: '',
    date: '',
    house: '',
    ending: '',
    commonNumber: ''
  });
  const newDateTime = new Date(inputField.date)
  newDateTime.setHours(15)



  const newCommonNumber =  inputField.commonNumber.split(',');
  const intArray = []

  newCommonNumber.map((item) => {
    intArray.push(parseInt(item));
  })



  const submitHandler = (e) => {
    e.preventDefault();
    addData()
  }

  
  
  async function addData() {
    const docRef = await addDoc(collection(db, "common_numbers"), {
      provider: inputField.provider,
      date: newDateTime,
      house: parseInt(inputField.house),
      ending: parseInt(inputField.ending),
      commonNumber: intArray
    })
    alert("Document has been created successfully")
    console.log(docRef.id)



  }
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({ ...prevState, [name]: value }));

  }
  return (
    <div className="h-screen w-screen bg-green-500">
      <div className="text-center  text-white">
        <div className="text-[36px] p-10 text-center text-white font-bold">TEER APP MANAGEMENT</div>
        <h2 className="text-2xl text-center pb-10">PUBLISH COMMON NUMBER</h2>
        <div className="flex flex-col justify-center  items-center gap-5" action="#">
          <select id="provider" name="provider" onChange={inputHandler} value={inputField.provider} className="w-[300px] text-gray-500 px-4 py-2 rounded-[30px]" type="text">
          <option value="">Select Provider</option>
            <option value="Shillong Teer">Shillong</option>
            <option value="Juwai">Juwai</option>
            <option value="Khanapara">Khanapara</option>
          </select>
          <input type="date" name="date" onChange={inputHandler} value={inputField.date} className="w-[300px] text-gray-500 px-4 py-2  rounded-[30px] " placeholder="Select Date" />
          <input type="text" name="commonNumber" onChange={inputHandler} value={inputField.commonNumber} className="w-[300px] text-gray-500 px-4 py-2  rounded-[30px] " placeholder="Common Numbers" />
          <div className="flex flex-row justify-between gap-5">
            <input type="number" name="house" onChange={inputHandler} value={inputField.house} className="w-[140px] text-gray-500 px-4 py-2  rounded-[30px] " placeholder="House" />
            <input type="number" name="ending" onChange={inputHandler} value={inputField.ending} className="w-[140px] text-gray-500 px-4 py-2  rounded-[30px] " placeholder="Ending" />

          </div>
          <button onClick={submitHandler} className="w-[300px] bg-blue-500 p-2 uppercase rounded-[30px]">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default CommonNumberScreen
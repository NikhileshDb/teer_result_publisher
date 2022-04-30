import React, {useState} from 'react'
import {db} from '../services/firebase';
import { getFirestore, collection, getDocs, addDoc, Timestamp } from 'firebase/firestore/lite';

function HomeScreen() {
  const [inputField, setInputField] = useState({
    provider: '',
    date: '',
    firstRound: '',
    secondRound:''
  })
  const inputHandler = (e) => {
    const {name, value} = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const newDateTime =  new Date(inputField.date)
    newDateTime.setHours(15)
  const submitButton = () => {
    
  //  console.log(inputField.provider)
  //  console.log(newDateTime)
  //  console.log(parseInt(inputField.firstRound))
  //  console.log(parseInt(inputField.secondRound))

  //Calling the addmethode to add data to firebase server
   addData()

  }

  //setting the firebase cloustore adding the results
   async function addData()  {
      const docRef = await addDoc(collection(db, "results"),{
        provider: inputField.provider,
        date: newDateTime,
        firstRound: parseInt(inputField.firstRound),
        secondRound: parseInt(inputField.secondRound)
      })
      alert("Document has been created successfully")
      console.log(docRef.id)



  }

  return (
   
    <div className="bg-green-500 h-screen w-full">
       <div className="text-[36px] p-10 text-center text-white font-bold">TEER APP MANAGEMENT</div>
       <h2 className="text-2xl pb-10 text-center text-white">LATEST RESULT</h2>
             <div className="flex flex-col justify-center items-center gap-5">
               <select id="provider" name="provider" onChange={inputHandler} value={inputField.provider} className="w-[300px] text-gray-500 px-4 py-2 rounded-[30px]" type="text">
                  <option value="">Select Provider</option>
                 <option value="Shillong Teer">Shillong</option>
                 <option value="Juwai">Juwai</option>
                 <option value="Khanapara">Khanapara</option>
               </select>
               <input type="date" name="date" value={inputField.date} onChange={inputHandler} className="w-[300px] text-gray-500 px-4 py-2  rounded-[30px] " placeholder="Select Date" />
              <div className="flex flex-row justify-between gap-5">
              <input type="text" name="firstRound" value={inputField.firstRound} onChange={inputHandler} className="w-[140px] text-gray-500 px-4 py-2  rounded-[30px] " placeholder="First Round" />
              <input type="text"name="secondRound" value={inputField.secondRound} onChange={inputHandler} className="w-[140px] text-gray-500 px-4 py-2  rounded-[30px] " placeholder="Second Round" />
              </div>
               <button onClick={submitButton} className="w-[300px] bg-blue-500 p-2  text-white uppercase rounded-[30px]">Submit</button>
             </div>
    </div>

  )
}

export default HomeScreen






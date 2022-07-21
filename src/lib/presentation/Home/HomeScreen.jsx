import React, { useState } from 'react'
import { db, useAuth } from '../../services/firebase';
import { getDocs, getDoc, collection, addDoc, doc, where, Timestamp, query, updateDoc } from 'firebase/firestore';

import AllResult from './components/AllResult';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';



function HomeScreen() {
  const [inputField, setInputField] = useState({
    provider: '',
    date: '',
    firstRound: '',
    secondRound: ''
  })

  const [edit, setEdit] = useState(false);

  const colReference = collection(db, "results");

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const newDateTime = new Date(inputField.date)
  newDateTime.setHours(16)
  const submitButton = () => {
    addData()
  }
  console.log(inputField.date)
  //setting the firebase cloustore adding the results
  async function addData() {
    const res = query(colReference, where("date", "==", Timestamp.fromDate(newDateTime)), where("provider", "==", inputField.provider));
    //later we will use the //Todo qs for cloudMessaging
    const qs = await getDocs(res).then((doc) => {
      if (doc.empty) {
        const docRef = addDoc(colReference, {
          provider: inputField.provider,
          date: newDateTime,
          firstRound: parseInt(inputField.firstRound),
          secondRound: parseInt(inputField.secondRound)
        },
          // console.log(docRef.id),
          alert("Document Created successfully"));

      } else {

        doc.forEach((item) => {
          console.log(item.id);
          alert("Already exists, UPDATE is Allowed!!!!!");
        });

      }
    });
  }

  // ToDo create afunction to edit for update without opening new edit page expose a function to child component and trigger the function in child, hence update the UI here and update the data

  const [documentUpdateRef, setdocumentUpdateRef] = useState();

  const focusEdit = async (e) => {
    setEdit(true);
    setdocumentUpdateRef(doc(colReference, e.target.value));
    const data = (await getDoc(doc(colReference, e.target.value))).data();
    setInputField({
      provider: data.provider,
      date: format(parseISO(data.date.toDate().toISOString()), 'yyyy-MM-dd'),
      firstRound: parseInt(data.firstRound),
      secondRound: parseInt(data.secondRound)
    });
  }


  //onUpdateHandler
  const updateHandler = async () => {
    await updateDoc(documentUpdateRef, {
      "date": newDateTime,
      "firstRound": parseInt(inputField.firstRound),
      "secondRound": parseInt(inputField.secondRound),

    }).then(() => {
      alert('Updated Successfully!!!!');
      setEdit(false);
    });

  }


  //currentUser
  const currentUser = useAuth();

  return (
    <div className="bg-green-500 h-screen w-full">
      <div className="text-[36px] pt-10 text-center text-white font-bold">TEER APP MANAGEMENT</div>
      <div className="text-[18px] pb-10 text-center text-white font-bold">Hello, {currentUser?.email}</div>



      <div className="flex flex-col sm:flex-row gap-10 justify-center">
        {/* Form Start */}
        <div className="flex flex-col justify-center items-center gap-5">
          <h2 className="text-2xl pb-10 text-center text-white">ADD NEW RESULT</h2>
          <select id="provider" name="provider" onChange={inputHandler} value={inputField.provider} className="w-[300px] text-gray-500 px-4 py-2 rounded-[30px]" type="text">
            <option value="">Select Provider</option>
            <option value="Shillong Teer">Shillong</option>
            <option value="Juwai">Juwai</option>
            <option value="Khanapara">Khanapara</option>
          </select>
          <input type="date" name="date" value={inputField.date} onChange={inputHandler} className="w-[300px] text-gray-500 px-4 py-2  rounded-[30px] " placeholder="Select Date" />
          <div className="flex flex-row justify-between gap-5">
            <input type="text" name="firstRound" value={inputField.firstRound} onChange={inputHandler} className="w-[140px] text-gray-500 px-4 py-2  rounded-[30px] " placeholder="First Round" />
            <input type="text" name="secondRound" value={inputField.secondRound} onChange={inputHandler} className="w-[140px] text-gray-500 px-4 py-2  rounded-[30px] " placeholder="Second Round" />
          </div>


          {edit ? <button onClick={updateHandler} className="w-[300px] bg-blue-500 p-2  text-white uppercase rounded-[30px]">UPDATE</button> : <button onClick={submitButton} className="w-[300px] bg-blue-500 p-2  text-white uppercase rounded-[30px]">Submit</button>}


        </div>
        {/* Form End */}
        <div className="flex flex-col justify-center items-center gap-5">
          <AllResult focusEdit={focusEdit} provider={inputField.provider} />
        </div>



      </div>
    </div>

  )
}

export default HomeScreen






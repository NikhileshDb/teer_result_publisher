import { React, useEffect, useState } from 'react'
import { db } from '../../../services/firebase';
import { doc, collection, deleteDoc, orderBy, query, where, limit, onSnapshot } from 'firebase/firestore';


function AllResult({ provider, focusEdit }) {
    const [resultList, setResultList] = useState([]);
    const colRef = collection(db, "results");


    //listening to the doc every time the doc changes
    useEffect(() => {
        const myArray = [];

        const q = query(colRef, limit(10), orderBy("date", "desc"), where("provider", "==", provider));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (snapshot.size) {
                snapshot.forEach((doc) => {
                    myArray.push({
                        "id": doc.id,
                        "date": doc.data().date,
                        "provider": doc.data().provider,
                        "firstRound": doc.data().firstRound,
                        "secondRound": doc.data().secondRound
                    });
                });

            } else {
                console.log("Fetching Error");
            }

            setResultList(myArray);
            return () => {
                unsubscribe();
            }

        })
    }, [provider])


    //Deleting Document
    async function delResult(e) {
        await deleteDoc(doc(colRef, e.target.value)).then(() => alert('File deleted successfully'));

    }


    return (
        <div className="flex flex-col items-center gap-5">

            <table className="text-white text-[18px] w-[320px]">
                <thead className="">
                    <tr className="bg-gray-500">
                        <td className="px-4 py-2 text-center font-semibold">Date</td>
                        <td className="px-4 py-2 text-center font-semibold">F/R</td>
                        <td className="px-4 py-2 text-center font-semibold">S/R</td>
                        <td className="px-4 py-2 text-center font-semibold">Action</td>

                    </tr>
                </thead>
                <tbody className="fixed overflow-y-auto h-[600px] ">
                    {resultList.map((item, index) =>
                        <tr key={index} className="bg-gray-700 text-[16px]">
                            <td className="px-4 py-2 text-center font-semibold">{(item.date).toDate().toLocaleDateString()}</td>
                            <td className="px-4 py-2 text-center font-semibold">{item.firstRound}</td>
                            <td className="px-4 py-2 text-center font-semibold">{item.secondRound}</td>
                            <td className="px-4 py-2 text-center font-semibold flex gap-2">
                                <button onClick={focusEdit} value={item.id} className="text-blue-500">Edit</button>
                                <button onClick={delResult} value={item.id} className="text-red-500">Delete</button>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default AllResult
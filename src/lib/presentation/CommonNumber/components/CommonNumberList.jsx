import { React, useEffect, useState } from 'react'
import { db } from '../../../services/firebase';
import { doc, collection, deleteDoc, orderBy, query, where, limit, onSnapshot } from 'firebase/firestore';

function CommonNumberList({ provider }) {
    const [commonNumberList, setCommonNumberList] = useState([]);
    const colRef = collection(db, "common_numbers");

    useEffect(() => {

        const tempArray = [];

        const q = query(colRef, limit(10), orderBy("date", "desc"), where("provider", "==", provider));
        const unsubscribe = onSnapshot(q, (snapshot) => {

            if (snapshot.size > 0) {

                snapshot.docs.forEach((doc) => {
                    tempArray.push({
                        "id": doc.id,
                        "date": doc.data().date,
                        "provider": doc.data().provider,
                        "house": doc.data().house,
                        "ending": doc.data().ending,
                        "commonNumber": doc.data().commonNumber,
                    });
                });

            } else {
                console.log("Fetching Error");
            }
            console.log(tempArray[0]);
            setCommonNumberList(tempArray);
            return () => {
                unsubscribe();
            }

        },
            (e) => console.log(e),
        )
    }, [provider])

    async function delItem(e) {
        console.log(e.target.value)
        await deleteDoc(doc(colRef, e.target.value)).then(() => alert('File deleted successfully'));

    }

    return (
        <>
            <div>
                <div className="text-[36px] pt-10 text-center text-white font-bold">TEER APP MANAGEMENT</div>
                <div>
                    <table className="text-white text-[18px]">
                        <thead className="">
                            <tr className="bg-gray-500">
                                <td className="px-4 py-2 text-center font-semibold">Date</td>
                                <td className="px-4 py-2 text-center font-semibold">House</td>
                                <td className="px-4 py-2 text-center font-semibold">Ending</td>
                                <td className="px-4 py-2 text-center font-semibold">Common</td>
                                <td className="px-4 py-2 text-center font-semibold">Action</td>
                            </tr>
                        </thead>
                        <tbody className="fixed overflow-y-auto h-[600px]">
                            {commonNumberList.map((item, index) => (


                                < tr key={index} className="bg-gray-700 text-[16px]" >
                                    <td className="px-4 py-2 text-center font-semibold">{(item.date).toDate().toLocaleDateString()}</td>
                                    <td className="px-4 py-2 text-center font-semibold">{item.house}</td>
                                    <td className="px-4 py-2 text-center font-semibold">{item.ending}</td>
                                    <td className="px-4 py-2 text-center font-semibold">
                                        <p className="w-[135px] break-all h-auto">{item.commonNumber.map((number) => number + ',')}</p>
                                    </td>
                                    <td className="px-4 py-2 text-center font-semibold text-red-500 cursor-pointer">
                                        <button onClick={delItem} value={item.id} className="text-red-500">Delete</button>
                                    </td>

                                </tr>)
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default CommonNumberList
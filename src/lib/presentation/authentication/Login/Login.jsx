import React from 'react'
import { signInWithEmailAndPassword, browserSessionPersistence } from '@firebase/auth';

function LoginScreen(props) {

    const auth = props.auth;
    const handleSubmit = (e) => {
        e.preventDefault();
        const emailAddress = e.target[0].value;
        const loginPassword = e.target[1].value;
        signInWithEmailAndPassword(auth, emailAddress, loginPassword).then((userCredential) => {
            if (userCredential.user != null) {
                window.location.pathname = "/";
            }
        }).catch((error) => {
            alert(error.message);
        })
    }

    return (
        <>

            <div className="w-full h-screen bg-green-500 flex flex-col justify-center items-center">

                <form onSubmit={handleSubmit} className=" flex flex-col gap-5 justify-center items-end bg-gray-700 pb-10 pr-10 pl-10 shadow-lg">
                    <h2 className="text-[34px] font-bold text-white w-full pt-6">Sign in to publish results</h2>

                    <div>
                        <label className="text-lg font-semibold px-4 text-white">Email</label>
                        <input className="h-[40px] w-[300px] rounded-2xl  px-4 focus:outline-none" type="text" placeholder="example@gmail.com" /></div>
                    <div>
                        <label className="text-lg font-semibold px-4 text-white">Password</label>
                        <input className="h-[40px] w-[300px] rounded-2xl  px-4 focus:outline-none" type="text" placeholder="**************" />
                    </div>
                    <button className="bg-blue-500 w-[300px] hover:bg-green-500 h-10  py-1 rounded-2xl text-white font-bold">Login</button>

                </form>
            </div>


        </>
    )
}

export default LoginScreen
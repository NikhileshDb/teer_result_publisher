import { React, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GiCircleClaws, GiHamburgerMenu } from 'react-icons/gi';
import { RiSearchFill } from 'react-icons/ri';
import { logOut, useAuth } from "../services/firebase";


// List of Menu data for Navigation menu using a map methode to add the title and url
const menuData = [
    {
        id: 1,
        title: 'Latest Result',
        link: '/'
    },
    {
        id: 2,
        title: 'Common Number',
        link: '/common-number'
    }

]


function NavBar(props) {
    let { url } = useParams();
    const currentUser = useAuth();
    //go to login onClick handler
    const goToLogin = () => {
        window.location.pathname = '/login';
        
    }


    const handleLogout =async (e) => {
        e.preventDefault();

        try{
            await logOut();
        } catch {
            alert('Error!')
        }
       
    }
    return (
        <>

            <div className="hidden flex-col gap-4 justify-center items-center sm:flex w-[300px] p-8 bg-blue-500 text-[18px] font-semibold">

                { currentUser ? menuData.map((item, index) => (
                    <Link key={index} className="text-white cursor-pointer hover:bg-green-500 w-[250px] p-5 rounded-[30px] bg-blue-300 text-center" to={item.link}>{item.title}</Link>
                )) : ""}

                {currentUser ?   <div onClick={handleLogout} className="font-semibold text-orange-500 text-xl cursor-pointer">Logout</div> : <div onClick={goToLogin} className="font-semibold text-orange-500 text-xl cursor-pointer">Login</div>
                    
                }
               
          
            </div>
        </>
    )
}

export default NavBar
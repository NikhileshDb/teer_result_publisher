import React from 'react'
import { Link,  useParams } from 'react-router-dom';
import {GiCircleClaws, GiHamburgerMenu} from 'react-icons/gi';
import {RiSearchFill} from 'react-icons/ri';



// List of Menu data for Navigation menu using a map methode to add the title and url
const menuData = [
    {   id: 1,
        title: 'Latest Result',
        link: '/'
    },
    {   id:2,
        title: 'Common Number',
        link: '/common-number'
    },
   
]


function NavBar() {
    let {url} = useParams();
    
    return (
        <>
            <div className="hidden flex-col gap-4 justify-center items-center sm:flex w-[300px] p-8 bg-blue-500 text-[18px] font-semibold">

                {menuData.map((item, index) => (
<Link key={index} className="text-white cursor-pointer hover:bg-green-500 w-[250px] p-5 rounded-[30px] bg-blue-300 text-center" to={item.link}>{item.title}</Link>                                                               
                ))}

            </div>
        </>
    )
}

export default NavBar
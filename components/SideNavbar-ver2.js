"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


import { FaRegComments, FaListAlt, FaList } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";

import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdOutlineLogout,
  } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiMessageSquareDots } from "react-icons/bi";

export default function SideNavbar({inactiveLink, activeLink, logout}) { 
  const pathname    = usePathname();

  return (
  <>
    {/* third div */}
    <div className=" my-4 border-b border-gray-100 pb-4">
        <Link href='/' className={ pathname==='/' ? activeLink : inactiveLink }>
                {/* <FaHome /> <span>Dashboard</span> */}
            <MdOutlineSpaceDashboard className="text-2xl" />
            <h3 className="text-base font-semibold">
                Dashboard
            </h3>
        </Link>

        <Link href='/categories' className={ pathname.includes('/categories') ? activeLink : inactiveLink }>
            <FaListAlt className="text-2xl"/> 
            <h3 className="text-base font-semibold">
                Categories
            </h3>
        </Link>

        <Link href='/products' className={ pathname.includes('/products') ? activeLink : inactiveLink }>
            <FaBoxOpen className="text-2xl"/>
            <h3 className="text-base font-semibold">
                Products
            </h3>
        </Link>

        <Link href='/orders' className={ pathname.includes('/orders') ? activeLink : inactiveLink }>
            <FaList className="text-2xl"/>
            <h3 className="text-base font-semibold">
                Orders
            </h3>
        </Link>

        <Link href='/analytics' className={ pathname.includes('/analytics') ? activeLink : inactiveLink }>
            <MdOutlineAnalytics className="text-2xl"/>
            <h3 className="text-base font-semibold">
                Analytics
            </h3>
        </Link>

        <Link href='/comments' className={ pathname.includes('/comments') ? activeLink : inactiveLink }>
            <FaRegComments className="text-2xl"/>
            <h3 className="text-base font-semibold">
                Comments
            </h3>
        </Link>

        <Link href='/messages' className={ pathname.includes('/messages') ? activeLink : inactiveLink }>
            <BiMessageSquareDots className="text-2xl"/>
            <h3 className="text-base font-semibold">
                Messages
            </h3>
        </Link>

        <Link href='/integration' className={ pathname.includes('/integration') ? activeLink : inactiveLink }>
            <MdOutlineIntegrationInstructions className="text-2xl"/>
            <h3 className="text-base font-semibold">
                Integration
            </h3>
        </Link>
    </div>

    {/* Settings */}
    <div className=" my-4 border-b border-gray-100 pb-4">
        <Link href='/settings' className={ pathname.includes('/settings') ? activeLink : inactiveLink }>
            <MdOutlineSettings className="text-2xl" />
            <h3 className="text-base font-semibold">
                Settings
            </h3>
        </Link>

        <Link href='/profile' className={ pathname.includes('/profile') ? activeLink : inactiveLink }>
            <CgProfile className="text-2xl" />
            <h3 className="text-base font-semibold">
                Profile
            </h3>
        </Link>

        <Link href='/more' className={ pathname.includes('/more') ? activeLink : inactiveLink }>
            <MdOutlineMoreHoriz className="text-2xl" />
            <h3 className="text-base font-semibold">
                More
            </h3>
        </Link>
    </div>

    {/* Logout */}
    <div className="mb-4 w-full">
        <div className={'flex mb-2 justify-start items-center border border-gray-200 hover:text-white hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'}>
            <MdOutlineLogout className="text-3xl pr-2" />
            <button 
                onClick={ logout }
            >
                <span>LogOut</span>
            </button>
        </div>  
    </div> 
  </>
  )
}

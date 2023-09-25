'use client'
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { FaRegComments, FaListAlt, FaList } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";

import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdOutlineLogout,
    MdKeyboardArrowRight,
    MdKeyboardArrowLeft,
  } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiMessageSquareDots } from "react-icons/bi";
import { SidebarContext } from "../context/SidebarContext";

const sidebarItemsTop =[
    {
        name:"Dashboard",
        href:'/',
        icon:'MdOutlineSpaceDashboard'
    },
    {
        name:"Categories",
        href:'/categories',
        icon:'FaListAlt'
    },
    {
        name:"Products",
        href:'/products',
        icon:'FaBoxOpen'
    },
    {
        name:"Orders",
        href:'/orders',
        icon:'FaList'
    },
    {
        name:"Analytics",
        href:'/analytics',
        icon:'MdOutlineAnalytics'
    },
    {
        name:"Comments",
        href:'/comments',
        icon:'FaRegComments'
    },
    {
        name:"Messages",
        href:'/messages',
        icon:'BiMessageSquareDots'
    },
    {
        name:"Integration",
        href:'/integration',
        icon:'MdOutlineIntegrationInstructions'
    },
]
const sidebarItemsBottom =[
    {
        name:"Settings",
        href:'/settings',
        icon:'MdOutlineSettings'
    },
    {
        name:"Profile",
        href:'/profile',
        icon:'CgProfile'
    },
    {
        name:"more",
        href:'/more',
        icon:'MdOutlineMoreHoriz'
    },
]
export default function SideNavbar({logo, title, inactiveLink, activeLink }) { 
  const router = useRouter();
  const pathname = usePathname();
  const { isCollapsed, toggleSidebarCollapse} = useContext(SidebarContext)

  async function logout() {
    await router.push("/");
    await signOut();
  }
  return (
  <div className="sidebar__wrapper">
    <button className="btn__Collapse" onClick={ toggleSidebarCollapse }>
        { isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft /> }
    </button>
    <aside className="sidebar" data-collapse={ isCollapsed }>
        <div className="sidebar__top">
            <Image 
                src={logo ?? '/vercel.svg'}
                width={40}
                height={40}
                className="sidebar__logo"
            />
            <span className='sidebar__logo-name'>{ title ?? 'EcommerceAdmin'}</span>
        </div>

        <ul className="sidebar__list my-4 border-b border-gray-100 pb-4">
            <li className="sidebar__item">
                <Link href='/' className={ pathname==='/' ? activeLink +' sidebar__link sidebar__link--active' : inactiveLink +' sidebar__link' }>
                    <span className="sidebar__icon ">
                        <MdOutlineSpaceDashboard />
                    </span>            
                    <span className="sidebar__name text-base font-semibold">
                        Dashboard
                    </span>
                </Link>
            </li>

            <li className="sidebar__item">
                <Link href='/categories' className={ pathname.includes('/categories') ? activeLink +' sidebar__link sidebar__link--active' : inactiveLink +' sidebar__link' }>
                    <span className="sidebar__icon ">
                        <FaListAlt />
                    </span>            
                    <span className="sidebar__name text-base font-semibold">
                        Categories
                    </span>
                </Link>
            </li>

            <li className="sidebar__item">
                <Link href='/products' className={ pathname.includes('/products') ? activeLink +' sidebar__link sidebar__link--active' : inactiveLink +' sidebar__link' }>
                    <span className="sidebar__icon ">
                        <FaBoxOpen />
                    </span>            
                    <span className="sidebar__name text-base font-semibold">
                        Products
                    </span>
                </Link>
            </li>

            <li className="sidebar__item">
                <Link href='/orders' className={ pathname.includes('/orders') ? activeLink +' sidebar__link sidebar__link--active' : inactiveLink +' sidebar__link' }>
                    <span className="sidebar__icon ">
                        <FaList />
                    </span>            
                    <span className="sidebar__name text-base font-semibold">
                        Orders
                    </span>
                </Link>
            </li>

            <li className="sidebar__item">
                <Link href='/analytics' className={ pathname.includes('/analytics') ? activeLink +' sidebar__link sidebar__link--active' : inactiveLink +' sidebar__link' }>
                    <span className="sidebar__icon ">
                        <MdOutlineAnalytics />
                    </span>            
                    <span className="sidebar__name text-base font-semibold">
                        Analytics
                    </span>
                </Link>
            </li>

            <li className="sidebar__item">
                <Link href='/comments' className={ pathname.includes('/comments') ? activeLink +' sidebar__link sidebar__link--active' : inactiveLink +' sidebar__link' }>
                    <span className="sidebar__icon ">
                        <FaRegComments />
                    </span>            
                    <span className="sidebar__name text-base font-semibold">
                        Comments
                    </span>
                </Link>
            </li>

            <li className="sidebar__item">
                <Link href='/messages' className={ pathname.includes('/messages') ? activeLink +' sidebar__link sidebar__link--active' : inactiveLink +' sidebar__link' }>
                    <span className="sidebar__icon ">
                        <BiMessageSquareDots />
                    </span>            
                    <span className="sidebar__name text-base font-semibold">
                        Messages
                    </span>
                </Link>
            </li>

            <li className="sidebar__item">
                <Link href='/integration' className={ pathname.includes('/integration') ? activeLink +' sidebar__link sidebar__link--active' : inactiveLink +' sidebar__link' }>
                    <span className="sidebar__icon ">
                        <MdOutlineIntegrationInstructions />
                    </span>            
                    <span className="sidebar__name text-base font-semibold">
                        Integration
                    </span>
                </Link>
            </li>
        </ul>

        <ul className="sidebar__list my-4 border-b border-gray-100 pb-4">
            <li className="sidebar__item">
                <Link href='/settings' className={ pathname.includes('/settings') ? activeLink +' sidebar__link sidebar__link--active' : inactiveLink +' sidebar__link' }>
                    <span className="sidebar__icon ">
                        <MdOutlineSettings />
                    </span>            
                    <span className="sidebar__name text-base font-semibold">
                        Settings
                    </span>
                </Link>
            </li>

            <li className="sidebar__item">
                <Link href='/profile' className={ pathname.includes('/profile') ? activeLink +' sidebar__link sidebar__link--active' : inactiveLink +' sidebar__link' }>
                    <span className="sidebar__icon ">
                        <CgProfile />
                    </span>            
                    <span className="sidebar__name text-base font-semibold">
                        Profile
                    </span>
                </Link>
            </li>

            <li className="sidebar__item">
                <Link href='/more' className={ pathname.includes('/more') ? activeLink +' sidebar__link sidebar__link--active' : inactiveLink +' sidebar__link' }>
                    <span className="sidebar__icon ">
                        <MdOutlineMoreHoriz />
                    </span>            
                    <span className="sidebar__name text-base font-semibold">
                        more
                    </span>
                </Link>
            </li>
        </ul>

        {/* Logout */}
        <div className="sidebar__list mb-4 w-full">
            <div className={'sidebar__item side__logout'}>
                <button className={'btn__logout flex items-center gap-1 justify-start'}
                    onClick={ logout }
                >
                <span className="sidebar__icon">
                    <MdOutlineLogout />
                </span>            
                <span className="sidebar__name">LogOut</span>
                </button>            
            </div>  
        </div> 
    </aside>       
  </div>
  )
}

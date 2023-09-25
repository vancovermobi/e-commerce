"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Disclosure } from "@headlessui/react";

import { FaHome, FaListAlt, FaList, FaCog } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";
import { SlLogout } from "react-icons/sl";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "./Logo";
import SideNavbar from "./SideNavbar-ver2";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  // CSS Class route actived Link
  const inactiveLink =
    "flex items-center gap-1 py-1 mb-4 justify-start gap-4 pl-4 rounded-l-lg group cursor-pointer hover:shadow-lg m-auto hover:text-primary hover:underline";
  const activeLink = inactiveLink + " bg-white text-primary rounded-l-lg";

  async function logout() {
    await router.push("/");
    await signOut();
  }

  return (
    <aside className="text-gray-500 p-4 pr-0">
      {/* <aside className='text-gray-900'> */}
      {/* <div className='md:hidden flex items-center'>
            <button>nav</button>

            <div className='flex grow justify-center mr-6'>
                <Logo title={'EcommerceAdmin'} />
            </div>
        </div> */}

      <Disclosure as="nav">
        <Disclosure.Button
          className={
            "absolute top-4 right-4 flex justify-center items-center peer  rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group"
          }
        >
          {/* <Logo
                    linkhref={''} 
                    title={'EcommerceAdmin'} 
                    classname={'flex justify-center items-center gap-1 hover:text-primary'}
                /> */}
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>

        {/* <nav className='flex flex-col gap-2'> */}
        <div className="flex flex-col pl-2 h-screen bg-bgGray z-20 fixed top-0 -left-96 lg:left-0 lg:w-60 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start items-center">
            <div className="font-bold border-b border-gray-100 pb-4 mr-4 w-full">
              <Logo
                linkhref={""}
                title={"EcommerceAdmin"}
                classname={
                  "flex justify-center items-center  mt-1 gap-1 hover:text-primary"
                }
              />
            </div>

            {/* Sidenavbar */}
            <SideNavbar
              inactiveLink={inactiveLink}
              activeLink={activeLink}
              logout={() => logout()}
            />

            {/* <Link href='/' className={ pathname==='/' ? activeLink : inactiveLink }>
                    <FaHome /> <span>Dashboard</span>
                </Link>

                <Link href='/categories' className={ pathname.includes('/categories') ? activeLink : inactiveLink }>
                    <FaListAlt /> <span>Categories</span>
                </Link>

                <Link href='/products' className={ pathname.includes('/products') ? activeLink : inactiveLink }>
                    <FaBoxOpen /> <span>Products</span>
                </Link>

                <Link href='/orders' className={ pathname.includes('/orders') ? activeLink : inactiveLink }>
                    <FaList /> <span>Orders</span>
                </Link>

                <Link href='/settings' className={ pathname.includes('/settings') ? activeLink : inactiveLink }>
                    <FaCog /> <span>Settings</span>
                </Link>
                
                <button className={inactiveLink}
                    onClick={ logout }
                >
                    <SlLogout /> <span>LogOut</span>
                </button> */}
          </div>
        </div>
      </Disclosure>
    </aside>
  );
}

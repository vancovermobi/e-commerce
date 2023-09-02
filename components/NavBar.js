'use client'

import Link  from 'next/link'
import { usePathname } from 'next/navigation'

import { FaStore, FaHome, FaListAlt, FaList, FaCog } from 'react-icons/fa'
import { FaBoxOpen } from 'react-icons/fa6'

export default function NavBar() {
  // Check route active
  const pathname = usePathname() 
  
  // CSS Class route actived Link  
  const inactiveLink = 'flex items-center gap-1 p-1'
  const activeLink = inactiveLink + ' bg-white text-blue-900 rounded-l-lg'

  return (
    <aside className='text-white p-4 pr-0'>
        <Link href='/' className='flex items-center gap-1 mb-4 mr-4'>
            <FaStore />
            <span className=''>EcommerceAdmin</span>
        </Link>

        <nav className='flex flex-col gap-2'>
            <Link href='/' className={ pathname==='/' ? activeLink : inactiveLink }>
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
        </nav>
    </aside>
  )
}

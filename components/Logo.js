import Link  from 'next/link'
import { FaStore } from 'react-icons/fa'

export default function Logo({ linkhref, title, classname }) {
  return (
    <>
      <Link href={ linkhref } className={ classname } >
              <FaStore className="text-base mr-2 lg:text-2xl" />
              <span className=' text-base lg:text-xl'>{ title }</span>
      </Link>
    </>
  )
}
 
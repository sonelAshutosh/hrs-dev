import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image'

function Navbar(props) {
  const { pathname } = useRouter() // Get the pathname from useRouter hook

  // Define your left navbar list items
  var navbarListItems = [
    { id: 1, link: 'My Schedules', path: '/admin/mySchedules' }, // Add path property for each item
    { id: 2, link: 'Tasks', path: '/admin/tasks' },
    { id: 3, link: 'Venues', path: '/admin/venues' },
    { id: 4, link: 'Human R.', path: '/admin/humanResource' },
    { id: 5, link: 'Analytics', path: '/admin/analytics' },
    { id: 6, link: 'Export', path: '/admin/export' },
  ]
  const [activeIndex, setActiveIndex] = useState(null)

  const handleLinkState = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className={styles['navbar-container']}>
      {/* <div>
        <Link href="/">
          <Image
            src="/logo.jpg"
            width="50"
            height="50"
            alt="logo"
            srcSet=""
            priority
          />
        </Link>
      </div> */}
      {/* <div className={styles['active-item']}></div> */}
      <ul>
        {navbarListItems.map((item) => {
          return (
            <Link href={item.path} key={item.id}>
              <li
                className={`${styles['navbar-list-item']} ${
                  pathname === item.path ? styles['active'] : ''
                }`}
                // className={`${styles['navbar-list-item']} ${styles['active']}`}
                onClick={() => handleLinkState(item.id)}
              >
                {item.link}
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}
export default Navbar

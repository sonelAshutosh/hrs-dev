import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/LeftNavbar.module.css'

function LeftNavbar(props) {
  const { pathname } = useRouter() // Get the pathname from useRouter hook

  // Define your left navbar list items
  var LeftNavbarListItems = [
    { id: 1, link: 'My Schedules', path: '/my-schedules' }, // Add path property for each item
    { id: 2, link: 'Tasks', path: '/tasks' },
    { id: 3, link: 'Venues', path: '/venues' },
    { id: 4, link: 'Human R.', path: '/human-resource' },
    // { id: 5, link: 'Analytics', path: '/analytics' },
    // { id: 6, link: 'Export', path: '/report' },
  ]
  const [activeIndex, setActiveIndex] = useState(null)

  const handleLinkState = (index) => {
    setActiveIndex(index)
  }

  return (
    <div
      className={
        props.open
          ? `${styles['left-navbar']} ${styles['left-navbar-open']}`
          : styles['left-navbar']
      }
    >
      <Link href="/create-schedule">
        <div className={styles['button']}>+ New</div>
      </Link>
      <div className={styles['left-navbar-list']}>
        <ul className={styles['ul']}>
          {LeftNavbarListItems.map((item) => (
            <Link href={item.path} key={item.id}>
              <li
                data-link-status={
                  pathname === item.path ? 'active' : 'inactive'
                }
                onClick={() => handleLinkState(item.id)}
              >
                {item.link}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default LeftNavbar

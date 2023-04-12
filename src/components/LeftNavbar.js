import React from 'react'
import styles from '../styles/LeftNavbar.module.css'
import Link from 'next/link'

function LeftNavbar(props) {
  var LeftNavbarListItems = [
    { id: 1, link: 'My Schedules' },
    { id: 2, link: 'Tasks' },
    { id: 3, link: 'Venues' },
    { id: 4, link: 'Human R.' },
    { id: 5, link: 'Analytics' },
    { id: 6, link: 'Export' },
  ]
  var navLeftList = []

  return (
    <div
      className={
        props.open
          ? `${styles['left-navbar']} ${styles['left-navbar-open']}`
          : styles['left-navbar']
      }
    >
      <div className={styles['button']}>+ New</div>
      <div className={styles['left-navbar-list']}>
        <ul className={styles['ul']}>
          <Link href="/">
            <li>My Schedules</li>
          </Link>
          <Link href="/tasks">
            <li>Tasks</li>
          </Link>
          <Link href="/venues">
            <li>Venues</li>
          </Link>
          <Link href="/human-resource">
            <li>Human Resource</li>
          </Link>
          <Link href="/analytics">
            <li>Analytics</li>
          </Link>
          <Link href="/report">
            <li>Report</li>
          </Link>
        </ul>
      </div>

      {/* <div className={styles['left-navbar-list']}>
        <ul className={styles['ul']}>
          {LeftNavbarListItems.forEach((item) => {
            navLeftList.push(<li key={item.id}>{item.link}</li>)
          })}
          {navLeftList}
        </ul>
      </div> */}
    </div>
  )
}
export default LeftNavbar

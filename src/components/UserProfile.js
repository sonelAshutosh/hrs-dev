import React from 'react'
import styles from '../styles/UserProfile.module.css'

function UserProfile(props) {
  return (
    // <div className="temp">
    <div
      className={
        props.open
          ? styles['user-profile']
          : `${styles['user-profile']} ${styles['user-profile-close']}`
      }
    >
      <div className={styles['user-profile-name']}>User Name</div>
      <div className={styles['user-profile-id']}>profileid@org.com</div>
      <div className={styles['user-profile-logout']}>
        <div className={styles['button']}>LOGOUT</div>
      </div>
    </div>
    // </div>
  )
}

export default UserProfile

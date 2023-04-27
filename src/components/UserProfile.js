import React, { useEffect, useState } from 'react'
import styles from '../styles/UserProfile.module.css'
import useAPIAuth from '../../api.config/useAPIAuth'
import { useRouter } from 'next/router'
import Image from 'next/image'
import LogoutIcon from '@/svg/LogoutIcon'

function UserProfile(props) {
  const [userEmail, setUserEmail] = useState('')
  const { loginStatus, logoutUser, getUserEmail } = useAPIAuth()
  const router = useRouter()

  const handleLogout = () => {
    logoutUser()
    router.push('/login')
  }

  useEffect(() => {
    if (loginStatus) {
      const { email } = getUserEmail()
      setUserEmail(email)
    }
  }, [userEmail])

  return (
    // <div className="temp">
    <div
      className={
        props.open
          ? styles['user-profile']
          : `${styles['user-profile']} ${styles['user-profile-close']}`
      }
    >
      <div className={styles['user-profile-container']}>
        <div className={styles['user-profile-icon']}>
          <Image
            src="/profile.jpg"
            width="75"
            height="75"
            alt="profile"
            srcSet=""
          />
        </div>
        <div className={styles['user-profile-items']}>
          <div className={styles['user-profile-name']}>
            {userEmail.split('@')[0].toLocaleUpperCase()}
          </div>
          <div className={styles['user-profile-id']}>{userEmail}</div>
          {/* <div className={styles['user-profile-logout']}></div> */}
        </div>
      </div>
      <div className={styles['button']} onClick={handleLogout}>
        <span>LOGOUT</span>
        <LogoutIcon />
      </div>
    </div>
    // </div>
  )
}

export default UserProfile

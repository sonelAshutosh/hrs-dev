import { React, useState } from 'react'
import RightNavIcon from '@/svg/RightNavIcon'
import styles from '../styles/RightNavbar.module.css'

function RightNavbar() {
  const [popOut, setPopOut] = useState(false)
  const rightPopOut = () => {
    setPopOut(!popOut)
  }

  return (
    <>
      <div className={styles['right-pop-out-button']} onClick={rightPopOut}>
        <RightNavIcon />
      </div>
      <div
        className={
          popOut
            ? `${styles['right-pop-out']} ${styles['right-pop-out-open']}`
            : styles['right-pop-out']
        }
      >
        Div Contents
      </div>
    </>
  )
}

export default RightNavbar

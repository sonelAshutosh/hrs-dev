import React from 'react'
import styles from '../styles/Table.module.css'

function Venues() {
  return (
    <>
      <div className={styles['container']}>
        <div className={styles['table']}>
          <div className={styles['table-row']}>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-1']}`}
            >
              Tasks Name
            </div>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-2']}`}
            >
              Tasks Code
            </div>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-3']}`}
            >
              Tasks Type
            </div>
          </div>
          <div className={styles['table-row']}>
            <div className={styles['table-column']}>Test</div>
            <div className={styles['table-column']}>Test</div>
            <div className={styles['table-column']}>Test</div>
          </div>
        </div>
        <div className={styles['add-button']}>
          <div className={styles['button']}>+</div>
        </div>
      </div>
    </>
  )
}

export default Venues

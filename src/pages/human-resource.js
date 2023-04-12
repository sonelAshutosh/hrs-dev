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
              First Name
            </div>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-2']}`}
            >
              Last Name
            </div>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-3']}`}
            >
              Shorthand
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

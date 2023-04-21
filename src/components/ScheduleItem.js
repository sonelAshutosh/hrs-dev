import React from 'react'
import styles from '../styles/ScheduleItem.module.css'

function ScheduleItem(props) {
  return (
    <div className={styles['schedule-item']} onClick={props.onClick}>
      <div className={styles['schedule-item-title']}>CSE 2022 VI Sem</div>
      <div className={styles['schedule-item-code']}>CSEVI22</div>
    </div>
  )
}

export default ScheduleItem

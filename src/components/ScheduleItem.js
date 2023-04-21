import React from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/ScheduleItem.module.css'

function ScheduleItem(props) {
  const router = useRouter()
  const handleSchedule = () => {
    router.push('/my-schedules/schedule-1')
  }
  return (
    <div className={styles['schedule-item']} onClick={handleSchedule}>
      <div className={styles['schedule-item-title']}>CSE 2022 VI Sem</div>
      <div className={styles['schedule-item-code']}>CSEVI22</div>
    </div>
  )
}

export default ScheduleItem

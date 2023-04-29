import React from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/ScheduleItem.module.css'

function ScheduleItem({ title, shortcode, session }) {
  const router = useRouter()
  const handleSchedule = () => {
    router.push('/my-schedules/schedule-1')
  }
  return (
    <div className={styles['schedule-item']} onClick={handleSchedule}>
      <div className={styles['schedule-item-title']}>
        <span> Title:</span>
        {title}
      </div>
      <div className={styles['schedule-item-code']}>
        <span> Code:</span>
        {shortcode}
      </div>
      <div className={styles['schedule-item-code']}>
        <span> Session:</span>
        {session}
      </div>
    </div>
  )
}

export default ScheduleItem

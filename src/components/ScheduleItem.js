import React from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/ScheduleItem.module.css'

function ScheduleItem(props) {
  const { scheduleId, title, shortcode, session } = props

  const router = useRouter()
  const handleSchedule = () => {
    router.push(`/my-schedules/${title}_${scheduleId}`)
  }

  return (
    <div
      key={scheduleId}
      className={styles['schedule-item']}
      onClick={handleSchedule}
    >
      <div className={styles['schedule-item-title']}>
        {/* <span> Title:</span> */}
        {title}
      </div>
      <div className={styles['schedule-item-code']}>
        {/* <span> Code:</span> */}
        {shortcode}
      </div>
      <div className={styles['schedule-item-session']}>
        {/* <span> Session:</span> */}
        {session} - {session + 1}
      </div>
    </div>
  )
}

export default ScheduleItem

import React from 'react'
import Slot from '../../components/Slot'
import styles from '../../styles/ScheduleNumber.module.css'

function ScheduleItem() {
  const schedule = []
  for (let i = 0; i < 36; i++) {
    schedule.push(<Slot key={i} />)
  }
  const rows = []
  for (let i = 0; i < 6; i++) {
    const row = []
    for (let j = 0; j < 6; j++) {
      row.push(schedule[i * 6 + j])
    }
    rows.push(
      <div key={i} className={styles['row']}>
        {row}
      </div>
    )
  }
  return <div className={styles['container']}>{rows}</div>
}

export default ScheduleItem

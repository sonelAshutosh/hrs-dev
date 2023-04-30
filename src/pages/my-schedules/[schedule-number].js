import { useEffect, useState } from 'react'
import React from 'react'
import Slot from '../../components/Slot'
import styles from '../../styles/ScheduleNumber.module.css'
import { useRouter } from 'next/router'

function ScheduleItem() {
  const [heading, setHeading] = useState()
  const router = useRouter()

  useEffect(() => {
    const temp = decodeURI(router.asPath.split('/')[2])
    setHeading(temp)
  }, [])

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
  return (
    <div className={styles['container']}>
      <h3>{heading}</h3>
      {rows}
    </div>
  )
}

export default ScheduleItem

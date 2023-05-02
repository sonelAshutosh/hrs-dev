import React, { useState } from 'react'
import styles from '../styles/SlotHeading.module.css'
import useAPIData from '../../api.config/useAPIData'

function SlotHeading({ type, title, colId }) {
  const { updateItem } = useAPIData()

  const [columnTitle, setColumnTitle] = useState('')
  const [columnStartTime, setColumnStartTime] = useState(-1)
  const [columnEndTime, setColumnEndTime] = useState(-1)

  const handleColumnTitle = (e) => {
    setColumnTitle(e.target.value)
    updateItem(
      'HRS_Column',
      colId,
      {
        name: columnTitle,
      },
      true
    )
  }
  const handleColumnStartTime = (e) => {
    setColumnStartTime(e.target.value)
    var temp = String(columnStartTime).split(':')
    temp = temp[0] + temp[1]
    updateItem(
      'HRS_Column',
      colId,
      {
        start_time: temp,
      },
      true
    )
  }
  const handleColumnEndTime = (e) => {
    setColumnEndTime(e.target.value)
    var temp = String(columnEndTime).split(':')
    temp = temp[0] + temp[1]
    updateItem(
      'HRS_Column',
      colId,
      {
        end_time: temp,
      },
      true
    )
  }

  // console.log('ColId' + colId, columnTime, columnTitle)

  if (type == 'row') {
    return <div className={styles['slot-heading-container']}>{title}</div>
  } else {
    return (
      <div className={styles['slot-heading-container']}>
        <input
          type="text"
          placeholder="Column Title"
          onChange={handleColumnTitle}
        />
        <input
          type="time"
          placeholder="Column Time"
          onChange={handleColumnStartTime}
        />
        <input
          type="time"
          placeholder="Column Time"
          onChange={handleColumnEndTime}
        />
      </div>
    )
  }
}

export default SlotHeading

import React, { useState } from 'react'
import styles from '../styles/SlotHeading.module.css'
import useAPIData from '../../api.config/useAPIData'

function SlotHeading({ type, title, colId, startTime, endTime }) {
  const { updateItem } = useAPIData()

  const [columnTitle, setColumnTitle] = useState(title)
  const [columnStartTime, setColumnStartTime] = useState(startTime)
  const [columnEndTime, setColumnEndTime] = useState(endTime)

  function convertToTimeString(num) {
    const formattedNum = num.toString().padStart(4, '0')
    let timeString
    if (formattedNum.length === 4) {
      timeString = `${formattedNum.slice(0, 2)}:${formattedNum.slice(2)}`
    } else if (formattedNum.length === 3) {
      timeString = `0${formattedNum.slice(0, 1)}:${formattedNum.slice(1)}`
    }
    // else {
    //   throw new Error('Number must be between 0 and 9999')
    // }
    return timeString
  }

  const handleColumnTitle = (e) => {
    const title = e.target.value
    setColumnTitle(title)
    updateItem(
      'HRS_Column',
      colId,
      {
        name: title,
      },
      true
    )
  }
  const handleColumnStartTime = (e) => {
    const sTime = e.target.value
    setColumnStartTime(sTime)
    if (sTime != null && sTime !== undefined) {
      var temp = String(sTime).split(':')
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
  }
  const handleColumnEndTime = (e) => {
    const eTime = e.target.value
    setColumnEndTime(eTime)
    // console.log(e.target.value)
    var temp = String(eTime).split(':')
    if (eTime != null && eTime !== undefined) {
      // add check for null or undefined
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
          value={columnTitle}
        />
        <input
          type="time"
          placeholder="Column Start Time"
          onChange={handleColumnStartTime}
          value={convertToTimeString(columnStartTime)}
        />
        <input
          type="time"
          placeholder="Column End Time"
          onChange={handleColumnEndTime}
          value={convertToTimeString(columnEndTime)}
        />
      </div>
    )
  }
}

export default SlotHeading

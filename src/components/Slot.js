import React from 'react'
import styles from '../styles/Slot.module.css'

function Slot() {
  return (
    <div className={styles['slot-container']}>
      <div className={styles['slot-task']}>
        <select>
          <option value="task1">Task 1</option>
          <option value="task2">Task 2</option>
          <option value="task3">Task 3</option>
        </select>
      </div>
      <div className={styles['slot-venue']}>
        <select>
          <option value="venue1">Venue 1</option>
          <option value="venue2">Venue 2</option>
          <option value="venue3">Venue 3</option>
        </select>
      </div>
      <div className={styles['slot-human']}>
        <select>
          <option value="human1">Human 1</option>
          <option value="human2">Human 2</option>
          <option value="human3">Human 3</option>
        </select>
      </div>
    </div>
  )
}

export default Slot

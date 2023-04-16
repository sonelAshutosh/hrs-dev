import React from 'react'
import styles from '../styles/CreateSchedule.module.css'

function CreateSchedule() {
  return (
    <div className={styles['create-schedule-container']}>
      <h1>Create Schedule</h1>
      <div className={styles['schedule-team-name']}>
        <label htmlFor="">Enter Team Name : </label>
        <input type="text" />
      </div>
      <div className={styles['schedule-title']}>
        <label htmlFor="">Enter Schedule Name : </label>
        <input type="text" />
      </div>
      <div className={styles['schedule-session']}>
        <label htmlFor="">Session : </label>
        <select name="" id="">
          <option value="">A</option>
          <option value="">B</option>
          <option value="">C</option>
        </select>
      </div>
      <div className={styles['schedule-format']}>
        <label htmlFor="">Format : </label>
        <select name="" id="">
          <option value="">A</option>
          <option value="">B</option>
          <option value="">C</option>
        </select>
      </div>
      <div className={styles['schedule-Profile']}>
        <label htmlFor="">Profile : </label>
        <select name="" id="">
          <option value="">A</option>
          <option value="">B</option>
          <option value="">C</option>
        </select>
      </div>
      <div className={styles['button']}>+ Create Schedule</div>
    </div>
  )
}

export default CreateSchedule

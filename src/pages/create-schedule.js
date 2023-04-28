import React, { useEffect, useState } from 'react'
import styles from '../styles/CreateSchedule.module.css'
import useAPIAuth from '../../api.config/useAPIAuth'
import useAPIData from '../../api.config/useAPIData'

function CreateSchedule() {
  const [team, setTeam] = useState()

  useEffect(() => {
    setTeam(localStorage.getItem('team'))
  }, [])

  return (
    <div className={styles['create-schedule-container']}>
      <h1>Create Schedule</h1>
      <div className={styles['schedule-team-name']}>
        <label htmlFor="">Enter Team Name : </label>
        <input type="text" value={team} disabled />
      </div>
      <div className={styles['schedule-title']}>
        <label htmlFor="">Enter Schedule Name : </label>
        <input type="text" />
      </div>
      <div className={styles['schedule-session']}>
        <label htmlFor="">Session : </label>
        <select defaultValue={new Date().getFullYear()}>
          {Array(200)
            .fill(0)
            .map((_, index) => {
              const year = 1900 + index
              return (
                <option key={year} value={year}>
                  {year} - {year + 1}
                </option>
              )
            })}
        </select>
      </div>
      <div className={styles['schedule-format']}>
        <label htmlFor="">Format : </label>
        <select name="" id="">
          <option value="">Day</option>
          <option value="">Date</option>
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

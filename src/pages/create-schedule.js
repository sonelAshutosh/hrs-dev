import React, { useEffect, useState } from 'react'
import styles from '../styles/CreateSchedule.module.css'
import useAPIAuth from '../../api.config/useAPIAuth'
import useAPIData from '../../api.config/useAPIData'
import { useRouter } from 'next/router'

function CreateSchedule() {
  // const [createSchedule, setCreateSchedule] = useState('')
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [session, setSession] = useState(new Date().getFullYear())
  const [format, setFormat] = useState('Day')
  const [profile, setProfile] = useState(1)
  const [team, setTeam] = useState('')
  const [allProfiles, setAllProfiles] = useState([])
  const { getItems, createItem } = useAPIData()

  useEffect(() => {
    setTeam(localStorage.getItem('team'))

    async function fetchData() {
      const response = await getItems(
        'HRS_ColumnProfile',
        ['id', 'name', 'number_of_column'],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true
      )
      const data = await response.data
      // console.log(data[0])
      await setAllProfiles(data)
    }

    fetchData()
  }, [])

  // console.log(allProfiles)
  const handleCreateSchedule = () => {
    const team = localStorage.getItem('team')
    const shortcode = title.toLocaleUpperCase()

    let number_of_rows = -1
    if (format === 'Day') {
      number_of_rows = 6
    } else {
      number_of_rows = 1
    }

    const newSchedule = {
      title,
      shortcode,
      session,
      number_of_rows,
      profile,
      team,
    }
    createItem('HRS_Schedule_Defination', newSchedule, true)
    router.push('/')
    // console.log(newSchedule)
  }

  return (
    <div className={styles['create-schedule-container']}>
      <h1>Create Schedule</h1>
      <div className={styles['schedule-team-name']}>
        <label htmlFor="">Enter Team Name : </label>
        <input type="text" value={team} disabled />
      </div>
      <div className={styles['schedule-title']}>
        <label htmlFor="">Enter Schedule Name : </label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className={styles['schedule-session']}>
        <label htmlFor="">Session : </label>
        <select
          defaultValue={new Date().getFullYear()}
          onChange={(e) => setSession(e.target.value)}
        >
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
        <select
          onChange={(e) => {
            setFormat(e.target.value)
          }}
        >
          <option value="Day">Day</option>
          <option value="Date">Date</option>
        </select>
      </div>
      <div className={styles['schedule-Profile']}>
        <label htmlFor="">Profile : </label>
        <select
          onChange={(e) => {
            const pfName = e.target.value
            const selectedProfile = allProfiles.find(
              (profile) => profile.name === pfName
            )
            setProfile(selectedProfile.id)
          }}
        >
          {allProfiles.map((pf) => {
            return (
              <option id={pf.id} key={pf.id} value={pf.name}>
                {pf.name}
              </option>
            )
          })}
        </select>
      </div>
      <div className={styles['button']} onClick={handleCreateSchedule}>
        + Create Schedule
      </div>
    </div>
  )
}

export default CreateSchedule

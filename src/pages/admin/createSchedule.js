import React, { useEffect, useState } from 'react'
import styles from '../../styles/CreateSchedule.module.css'
import useAPIAuth from '../../../api.config/useAPIAuth'
import useAPIData from '../../../api.config/useAPIData'
import { useRouter } from 'next/router'
import { resolve } from 'styled-jsx/css'

function CreateSchedule() {
  var scheduleId = -1
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [session, setSession] = useState(new Date().getFullYear())
  const [format, setFormat] = useState('Day')
  const [allProfiles, setAllProfiles] = useState([])
  const [profile, setProfile] = useState({})
  const [team, setTeam] = useState('')
  const { getItems, createItem } = useAPIData()

  const weekDay = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thrusday',
    'Friday',
    'Saturday',
  ]

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
      const data = response.data
      // console.log(data[0])
      setAllProfiles(data)
      setProfile(data[0])
    }

    fetchData()
  }, [])

  const handleCreateSchedule = async () => {
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

    await createItem('HRS_Schedule_Defination', newSchedule, true)

    new Promise(async (resolve) => {
      const response = await getItems(
        'HRS_Schedule_Defination',
        undefined,
        undefined,
        undefined,
        {
          title: newSchedule.title,
          shortcode: newSchedule.shortcode,
          session: newSchedule.session,
        },
        undefined,
        undefined,
        true
      )
      const data = response.data
      // console.log(data[0].id)
      resolve(data[0])
    })
      .then((data) => {
        scheduleId = data.id

        const newColumn = {
          name: '',
          start_time: 0,
          end_time: 0,
          profile: profile.id,
          Schedule: data.id,
        }

        for (var i = 0; i < profile.number_of_column; i++) {
          createItem('HRS_Column', newColumn, true)
        }

        for (var i = 0; i < number_of_rows; i++) {
          if (format === 'Day') {
            var newRow = {
              type: 'Day',
              day: weekDay[i],
              date: 0,
              schedule: data.id,
            }
          }
          // if (format === 'Date')
          // add this code here********************************************************
          createItem('HRS_Row', newRow, true)
        }
      })
      .then(async () => {
        // console.log('Schedule ID' + scheduleId)
        const responseCol = await getItems(
          'HRS_Column',
          undefined,
          undefined,
          undefined,
          { Schedule: scheduleId },
          undefined,
          undefined,
          true
        )
        const dataCol = responseCol.data
        const responseRow = await getItems(
          'HRS_Row',
          undefined,
          undefined,
          undefined,
          { schedule: scheduleId },
          undefined,
          undefined,
          true
        )
        const dataRow = responseRow.data
        return [dataCol, dataRow]
      })
      .then((data) => {
        const [dataCol, dataRow] = data
        const work = null
        const venue = null
        const human = null

        dataCol.forEach((col) => {
          dataRow.forEach((row) => {
            const newSlot = {
              work,
              venue,
              human,
              row: row.id,
              column: col.id,
            }
            createItem('HRS_Slot', newSlot, true)
          })
        })
      })

    // console.log(data)
    router.push('/')
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
            setProfile(selectedProfile) //.id
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
      <button className={styles['button']} onClick={handleCreateSchedule}>
        + Create Schedule
      </button>
    </div>
  )
}

export default CreateSchedule

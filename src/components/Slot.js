import React, { useEffect, useState } from 'react'
import styles from '../styles/Slot.module.css'
import useAPIData from '../../api.config/useAPIData'

function Slot(props) {
  const { slotId, rowId, columnId, workId, venueId, humanId } = props
  const { tasksList, venuesList, humansList } = props
  const { updateItem } = useAPIData()

  // const { getItems } = useAPIData()

  // const [tasks, setTasks] = useState([])
  // const [venues, setVenues] = useState([])
  // const [humans, setHumans] = useState([])

  // async function fetchData() {
  //   const team = Number(localStorage.getItem('team'))
  //   const responseTask = getItems(
  //     'HRS_Work',
  //     undefined,
  //     undefined,
  //     undefined,
  //     { team: team },
  //     undefined,
  //     undefined,
  //     true
  //   )
  //   const dataTask = responseTask.data
  //   const responseVenue = getItems(
  //     'HRS_Venue',
  //     undefined,
  //     undefined,
  //     undefined,
  //     { team: team },
  //     undefined,
  //     undefined,
  //     true
  //   )
  //   const dataVenue = responseVenue.data
  //   const responseHuman = getItems(
  //     'HRS_HumanResource',
  //     undefined,
  //     undefined,
  //     undefined,
  //     { team: team },
  //     undefined,
  //     undefined,
  //     true
  //   )
  //   const dataHuman = responseHuman.data
  //   setTasks(dataTask)
  //   setVenues(dataVenue)
  //   setHumans(dataHuman)
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  // console.log(venueList)

  const handleTaskChange = (e) => {
    const temp = e.target.value
    updateItem('HRS_Slot', slotId, { work: temp }, true)
  }
  const handleVenueChange = (e) => {
    const temp = e.target.value
    updateItem('HRS_Slot', slotId, { venue: temp }, true)
  }
  const handleHumanChange = (e) => {
    const temp = e.target.value
    updateItem('HRS_Slot', slotId, { human: temp }, true)
  }

  return (
    <div id={slotId} key={slotId} className={styles['slot-container']}>
      <div className={styles['slot-task']}>
        <select
          onChange={handleTaskChange}
          defaultValue={workId}
          placeholder="Task"
        >
          <option value=""></option>
          {tasksList.map((task) => {
            return (
              <option id={task.id} key={task.id} value={task.id}>
                {task.name}
              </option>
            )
          })}
        </select>
      </div>
      <div className={styles['slot-venue']}>
        <select
          onChange={handleVenueChange}
          defaultValue={venueId}
          placeholder="Venue"
        >
          <option value=""></option>
          {venuesList.map((venue) => {
            return (
              <option id={venue.id} key={venue.id} value={venue.id}>
                {venue.name}
              </option>
            )
          })}
        </select>
      </div>
      <div className={styles['slot-human']}>
        <select
          onChange={handleHumanChange}
          defaultValue={humanId}
          placeholder="Human"
        >
          <option value=""></option>
          {humansList.map((human) => {
            return (
              <option id={human.id} key={human.id} value={human.id}>
                {human.name}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default Slot

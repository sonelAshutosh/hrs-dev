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
    const selectedTask = tasksList.find((task) => task.name === temp)
    // console.log(selectedTask.id)
    updateItem('HRS_Slot', slotId, { work: selectedTask.id }, true)
  }
  const handleVenueChange = (e) => {
    const temp = e.target.value
    const selectedVenue = venuesList.find((venue) => venue.name === temp)
    // console.log(selectedVenue.id)
    updateItem('HRS_Slot', slotId, { venue: selectedVenue.id }, true)
  }
  const handleHumanChange = (e) => {
    const temp = e.target.value
    const selectedHuman = humansList.find((human) => human.name === temp)
    // console.log(selectedHuman.id)
    updateItem('HRS_Slot', slotId, { human: selectedHuman.id }, true)
  }

  return (
    <div id={slotId} key={slotId} className={styles['slot-container']}>
      <div className={styles['slot-task']}>
        <select onChange={handleTaskChange}>
          {tasksList.map((task) => {
            return (
              <option id={task.id} key={task.id}>
                {task.name}
              </option>
            )
          })}
        </select>
      </div>
      <div className={styles['slot-venue']}>
        <select onChange={handleVenueChange}>
          {venuesList.map((venue) => {
            return (
              <option id={venue.id} key={venue.id}>
                {venue.name}
              </option>
            )
          })}
        </select>
      </div>
      <div className={styles['slot-human']}>
        <select onChange={handleHumanChange}>
          {humansList.map((human) => {
            return (
              <option id={human.id} key={human.id}>
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

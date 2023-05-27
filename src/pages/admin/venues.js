import React, { useState, useEffect } from 'react'
import styles from '../../styles/Table.module.css'
import DeleteIcon from '@/svg/DeleteIcon'
import AddIcon from '@/svg/AddIcon'
import useAPIAuth from '../../../api.config/useAPIAuth'
import useAPIData from '../../../api.config/useAPIData'
import { TextField } from '@mui/material'

function Venues() {
  const { getItems, createItem, deleteItem } = useAPIData()

  const [venues, setVenues] = useState([])
  // const [name, setName] = useState('')
  // const [shortname, setshortname] = useState('')
  // const [team, setTeam] = useState()

  useEffect(() => {
    async function fetchData() {
      const team = localStorage.getItem('team')
      const response = await getItems(
        'HRS_Venue',
        ['id', 'name', 'shortname'],
        undefined,
        undefined,
        { team: team },
        undefined,
        undefined,
        true
      )
      const data = await response.data
      setVenues(data)
    }
    // setTeam(localStorage.getItem('team'))
    fetchData()
  }, [])

  const handleVenueAddition = (e) => {
    e.preventDefault()

    const data = new FormData(e.target)

    const venueName = data.get('venueName')
    const venueCode = data.get('venueCode')
    const venueTeam = localStorage.getItem('team')

    if (venueName && venueCode) {
      const newVenue = {
        name: venueName,
        shortname: venueCode,
        team: venueTeam,
      }
      setVenues([...venues, newVenue])
      createItem('HRS_Venue', newVenue, true)
    }
  }

  const handleDeleteButtonClick = async (index) => {
    if (confirm('Confirm Deletion ? ')) {
      const venueToDelete = venues[index]
      await deleteItem('HRS_Venue', venueToDelete.id, undefined, true)

      const updatedVenues = [...venues]
      updatedVenues.splice(index, 1)
      setVenues(updatedVenues)
    }
  }

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['table']}>
          <div className={styles['table-row']}>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-1']}`}
            >
              Venue Name
            </div>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-2']}`}
            >
              Venue Code
            </div>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-4']}`}
            >
              Actions
            </div>
          </div>
          {venues.map((venue, index) => (
            <div key={index} className={styles['table-row']}>
              <div className={styles['table-column']}>{venue.name}</div>
              <div className={styles['table-column']}>{venue.shortname}</div>
              <div className={styles['delete-button']}>
                <div
                  className={styles['button']}
                  onClick={() => handleDeleteButtonClick(index)}
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleVenueAddition}
          method="post"
          className={styles['form']}
        >
          <TextField
            // fullWidth
            label="Venue Name"
            id="venueName"
            variant="filled"
            name="venueName"
          />
          &nbsp;
          <TextField
            // fullWidth
            label="Venue Code"
            id="venueCode"
            variant="filled"
            name="venueCode"
          />
          <div className={styles['add-button']}>
            <button type="submit" className={styles['button']}>
              <AddIcon />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Venues

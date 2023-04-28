import React, { useState, useEffect } from 'react'
import styles from '../styles/Table.module.css'
import DeleteIcon from '@/svg/DeleteIcon'
import AddIcon from '@/svg/AddIcon'
import useAPIAuth from '../../api.config/useAPIAuth'
import useAPIData from '../../api.config/useAPIData'

function Venues() {
  const { getItems, createItem, deleteItem } = useAPIData()
  const { getUserEmail } = useAPIAuth()

  const [venues, setVenues] = useState([])
  const [name, setName] = useState('')
  const [shortname, setshortname] = useState('')
  const [team, setTeam] = useState()

  useEffect(() => {
    async function fetchData() {
      const response = await getItems(
        'HRS_Venue',
        ['name', 'shortname'],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true
      )
      const data = await response.data
      setVenues(data)
    }
    setTeam(localStorage.getItem('team'))
    fetchData()
  }, [])

  const handleAddButtonClick = async () => {
    if (name && shortname) {
      // Only add the task if all three inputs are filled
      const newVenue = {
        name,
        shortname,
        team,
      }
      setVenues([...venues, newVenue])
      setName('')
      setshortname('')

      createItem('HRS_Venue', newVenue, true)
    }
  }

  const handleDeleteButtonClick = async (index) => {
    const venueToDelete = venues[index]
    const response = await getItems(
      'HRS_Venue',
      [],
      undefined,
      undefined,
      undefined,
      undefined,
      [venueToDelete.name, venueToDelete.shortname],
      true
    )
    // console.log(response.data[0])
    await deleteItem('HRS_Venue', response.data[0].id, undefined, true)

    const updatedVenues = [...venues]
    updatedVenues.splice(index, 1)
    setVenues(updatedVenues)
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
        <div className={styles['table-row']}>
          <div className={styles['table-column-input']}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Venue Name"
            />
          </div>
          <div className={styles['table-column-input']}>
            <input
              type="text"
              value={shortname}
              onChange={(e) => setshortname(e.target.value)}
              placeholder="Venue Code"
            />
          </div>
          <div className={styles['add-button']}>
            <div className={styles['button']} onClick={handleAddButtonClick}>
              <AddIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Venues

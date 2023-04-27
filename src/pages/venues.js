import React, { useState, useEffect } from 'react'
import styles from '../styles/Table.module.css'
import DeleteIcon from '@/svg/DeleteIcon'
import AddIcon from '@/svg/AddIcon'
import useAPIData from '../../api.config/useAPIData'

function Venues() {
  const { getItems } = useAPIData()
  const [venues, setVenues] = useState([])
  const [name, setName] = useState('')
  const [code, setCode] = useState('')

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
      // console.log(data)
    }
    fetchData()
  }, [])

  const handleAddButtonClick = () => {
    if (name && code) {
      const newVenue = { name, code }
      setVenues([...venues, newVenue])
      setName('')
      setCode('')
    }
  }

  const handleDeleteButtonClick = (index) => {
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
              value={code}
              onChange={(e) => setCode(e.target.value)}
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

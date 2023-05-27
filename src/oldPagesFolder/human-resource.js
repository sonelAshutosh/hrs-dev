import React, { useState, useEffect } from 'react'
import styles from '../styles/Table.module.css'
import DeleteIcon from '@/svg/DeleteIcon'
import AddIcon from '@/svg/AddIcon'
import useAPIAuth from '../../api.config/useAPIAuth'
import useAPIData from '../../api.config/useAPIData'

function HumanResource() {
  const { getItems, createItem, deleteItem } = useAPIData()
  const { getUserEmail } = useAPIAuth()

  // State variables for humanResource, name, code, and type
  const [humanResource, setHumanResource] = useState([])
  const [name, setName] = useState('')
  const [shortname, setShortname] = useState('')
  const [team, setTeam] = useState()

  useEffect(() => {
    async function fetchData() {
      const team = localStorage.getItem('team')
      const response = await getItems(
        'HRS_HumanResource',
        ['name', 'shortname'],
        undefined,
        undefined,
        { team: team },
        undefined,
        undefined,
        true
      )
      const data = await response.data
      setHumanResource(data)
      // console.log(data)
    }
    setTeam(localStorage.getItem('team'))
    fetchData()
  }, [])

  // Function to handle adding a new task
  const handleAddButtonClick = async () => {
    if (name && shortname) {
      // Only add the task if all three inputs are filled
      const newHuman = {
        name,
        shortname,
        team,
      }
      setHumanResource([...humanResource, newHuman])
      setName('')
      setShortname('')

      createItem('HRS_HumanResource', newHuman, true)
    }
  }

  // Function to handle deleting a task
  const handleDeleteButtonClick = async (index) => {
    const humanToDelete = humanResource[index]
    const response = await getItems(
      'HRS_HumanResource',
      [],
      undefined,
      undefined,
      undefined,
      undefined,
      [humanToDelete.name, humanToDelete.shortname],
      true
    )
    // Create a new array of humanResource excluding the task to be deleted
    await deleteItem('HRS_HumanResource', response.data[0].id, undefined, true)
    const updatedHumanResource = [...humanResource]
    updatedHumanResource.splice(index, 1)
    setHumanResource(updatedHumanResource)
  }

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['table']}>
          <div className={styles['table-row']}>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-1']}`}
            >
              First Name
            </div>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-3']}`}
            >
              Short Name
            </div>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-4']}`}
            >
              Actions
            </div>
          </div>
          {humanResource.map((human, index) => (
            <div key={index} className={styles['table-row']}>
              <div className={styles['table-column']}>{human.name}</div>
              {/* <div className={styles['table-column']}>{human.lastName}</div> */}
              <div className={styles['table-column']}>{human.shortname}</div>
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
              placeholder="Name"
            />
          </div>
          <div className={styles['table-column-input']}>
            <input
              type="text"
              value={shortname}
              onChange={(e) => setShortname(e.target.value)}
              placeholder="shortname"
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

export default HumanResource

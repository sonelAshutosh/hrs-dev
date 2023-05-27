import React, { useState, useEffect } from 'react'
import styles from '../../styles/Table.module.css'
import DeleteIcon from '@/svg/DeleteIcon'
import AddIcon from '@/svg/AddIcon'
import useAPIAuth from '../../../api.config/useAPIAuth'
import useAPIData from '../../../api.config/useAPIData'
import { TextField } from '@mui/material'

function HumanResource() {
  const { getItems, createItem, deleteItem } = useAPIData()

  // State variables for humanResource, name, code, and type
  const [humanResource, setHumanResource] = useState([])

  useEffect(() => {
    async function fetchData() {
      const team = localStorage.getItem('team')
      const response = await getItems(
        'HRS_HumanResource',
        ['id', 'name', 'shortname'],
        undefined,
        undefined,
        { team: team },
        undefined,
        undefined,
        true
      )
      const data = response.data
      setHumanResource(data)
      // console.log(data)
    }
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

  const handleHumanResourceAddition = (e) => {
    e.preventDefault()

    const data = new FormData(e.target)

    const humanName = data.get('humanName')
    const humanCode = data.get('humanCode')
    const humanTeam = localStorage.getItem('team')

    if (humanName && humanCode) {
      const newHuman = {
        name: humanName,
        shortname: humanCode,
        team: humanTeam,
      }
      setHumanResource([...humanResource, newHuman])
      createItem('HRS_HumanResource', newHuman, true)
    }
  }

  // Function to handle deleting a task
  const handleDeleteButtonClick = async (index) => {
    if (confirm('Confirm Deletion ? ')) {
      const humanToDelete = humanResource[index]

      await deleteItem('HRS_HumanResource', humanToDelete.id, undefined, true)
      const updatedHumanResource = [...humanResource]
      updatedHumanResource.splice(index, 1)
      setHumanResource(updatedHumanResource)
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
        <form
          onSubmit={handleHumanResourceAddition}
          method="post"
          className={styles['form']}
        >
          <TextField
            // fullWidth
            label="Human Name"
            id="humanName"
            variant="filled"
            name="humanName"
          />
          &nbsp;
          <TextField
            // fullWidth
            label="Human Code"
            id="humanCode"
            variant="filled"
            name="humanCode"
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

export default HumanResource

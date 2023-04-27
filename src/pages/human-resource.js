import React, { useState, useEffect } from 'react'
import styles from '../styles/Table.module.css'
import DeleteIcon from '@/svg/DeleteIcon'
import AddIcon from '@/svg/AddIcon'
import useAPIData from '../../api.config/useAPIData'

function HumanResource() {
  const { getItems } = useAPIData()
  // State variables for humanResource, name, code, and type
  const [humanResource, setHumanResource] = useState([])
  const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  const [shorthand, setShorthand] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await getItems(
        'HRS_HumanResource',
        ['name', 'shortname'],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true
      )
      const data = await response.data
      setHumanResource(data)
      // console.log(data)
    }
    fetchData()
  }, [])

  // Function to handle adding a new task
  const handleAddButtonClick = () => {
    if (firstName && shorthand) {
      // Only add the task if all three inputs are filled
      const newHuman = {
        firstName,
        // lastName,
        shorthand,
      }
      setHumanResource([...humanResource, newHuman])
      setFirstName('')
      // setLastName('')
      setShorthand('')
    }
  }

  // Function to handle deleting a task
  const handleDeleteButtonClick = (index) => {
    // Create a new array of humanResource excluding the task to be deleted
    const updatedhumanResource = humanResource.filter((_, i) => i !== index)
    setHumanResource(updatedhumanResource)
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
            {/* <div
              className={`${styles['table-heading']} ${styles['table-heading-2']}`}
            >
              Last Name
            </div> */}
            <div
              className={`${styles['table-heading']} ${styles['table-heading-3']}`}
            >
              Shorthand
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Name"
            />
          </div>
          {/* <div className={styles['table-column-input']}>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div> */}
          <div className={styles['table-column-input']}>
            <input
              type="text"
              value={shorthand}
              onChange={(e) => setShorthand(e.target.value)}
              placeholder="Shorthand"
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

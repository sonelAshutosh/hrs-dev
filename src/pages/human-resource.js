import React, { useState } from 'react'
import styles from '../styles/Table.module.css'
import DeleteIcon from '@/svg/DeleteIcon'
import AddIcon from '@/svg/AddIcon'

function HumanResource() {
  // State variables for tasks, name, code, and type
  const [tasks, setTasks] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [shorthand, setShorthand] = useState('')

  // Function to handle adding a new task
  const handleAddButtonClick = () => {
    if (firstName && lastName && shorthand) {
      // Only add the task if all three inputs are filled
      const newTask = {
        firstName,
        lastName,
        shorthand,
      }
      setTasks([...tasks, newTask])
      setFirstName('')
      setLastName('')
      setShorthand('')
    }
  }

  // Function to handle deleting a task
  const handleDeleteButtonClick = (index) => {
    // Create a new array of tasks excluding the task to be deleted
    const updatedTasks = tasks.filter((_, i) => i !== index)
    setTasks(updatedTasks)
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
              className={`${styles['table-heading']} ${styles['table-heading-2']}`}
            >
              Last Name
            </div>
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
          {tasks.map((task, index) => (
            <div key={index} className={styles['table-row']}>
              <div className={styles['table-column']}>{task.firstName}</div>
              <div className={styles['table-column']}>{task.lastName}</div>
              <div className={styles['table-column']}>{task.shorthand}</div>
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
              placeholder="First Name"
            />
          </div>
          <div className={styles['table-column-input']}>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>
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

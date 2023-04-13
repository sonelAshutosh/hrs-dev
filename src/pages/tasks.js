import React, { useState } from 'react'
import styles from '../styles/Table.module.css'
import DeleteIcon from '@/svg/DeleteIcon'
import AddIcon from '@/svg/AddIcon'

function Tasks() {
  // State variables for tasks, name, code, and type
  const [tasks, setTasks] = useState([])
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [type, setType] = useState('')

  // Function to handle adding a new task
  const handleAddButtonClick = () => {
    if (name && code && type) {
      // Only add the task if all three inputs are filled
      const newTask = {
        name,
        code,
        type,
      }
      setTasks([...tasks, newTask])
      setName('')
      setCode('')
      setType('')
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
              Tasks Name
            </div>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-2']}`}
            >
              Tasks Code
            </div>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-3']}`}
            >
              Tasks Type
            </div>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-4']}`}
            >
              Actions
            </div>
          </div>
          {tasks.map((task, index) => (
            <div key={index} className={styles['table-row']}>
              <div className={styles['table-column']}>{task.name}</div>
              <div className={styles['table-column']}>{task.code}</div>
              <div className={styles['table-column']}>{task.type}</div>
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
              placeholder="Task Name"
            />
          </div>
          <div className={styles['table-column-input']}>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Task Code"
            />
          </div>
          <div className={styles['table-column-input']}>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Task Type"
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

export default Tasks

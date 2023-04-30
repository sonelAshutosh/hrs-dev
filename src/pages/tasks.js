import React, { useState, useEffect } from 'react'
import useAPIData from '../../api.config/useAPIData'

import AddIcon from '@/svg/AddIcon'
import DeleteIcon from '@/svg/DeleteIcon'
import styles from '../styles/Table.module.css'

function Tasks() {
  // State variables for tasks, name, code, and type
  const { getItems, createItem, deleteItem } = useAPIData()

  const [tasks, setTasks] = useState([])
  const [name, setName] = useState('')
  const [shortcode, setShortCode] = useState('')
  const [type, setType] = useState('')
  const [team, setTeam] = useState()

  useEffect(() => {
    async function fetchData() {
      const response = await getItems(
        'HRS_Work',
        ['name', 'shortcode', 'type'],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true
      )
      const data = await response.data
      setTasks(data)
    }
    setTeam(localStorage.getItem('team'))
    fetchData()
  }, [])

  // Function to handle adding a new task
  const handleAddButtonClick = async () => {
    if (name && shortcode && type) {
      // Only add the task if all three inputs are filled
      const newTask = {
        name,
        shortcode,
        type,
        team,
      }
      setTasks([...tasks, newTask])
      setName('')
      setShortCode('')
      setType('')

      createItem('HRS_Work', newTask, true)
    }
  }

  // Function to handle deleting a task
  const handleDeleteButtonClick = async (index) => {
    // Get the task to be deleted
    const taskToDelete = tasks[index]
    const response = await getItems(
      'HRS_Work',
      [],
      undefined,
      undefined,
      undefined,
      undefined,
      [taskToDelete.name, taskToDelete.shortcode],
      true
    )

    await deleteItem('HRS_Work', response.data[0].id, undefined, true)
    const updatedTasks = [...tasks]
    updatedTasks.splice(index, 1)
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
              <div className={styles['table-column']}>{task.shortcode}</div>
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
              value={shortcode}
              onChange={(e) => setShortCode(e.target.value)}
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

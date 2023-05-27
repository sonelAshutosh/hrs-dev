import React, { useState, useEffect, useRef } from 'react'
import useAPIData from '../../../api.config/useAPIData'

import AddIcon from '@/svg/AddIcon'
import DeleteIcon from '@/svg/DeleteIcon'
import { TextField } from '@mui/material'
import styles from '../../styles/Table.module.css'

function Tasks() {
  // State variables for tasks, name, code, and type
  const { getItems, createItem, deleteItem } = useAPIData()

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    async function fetchData() {
      const team = localStorage.getItem('team')
      const response = await getItems(
        'HRS_Work',
        ['id', 'name', 'shortcode', 'type'],
        undefined,
        undefined,
        { team: team },
        undefined,
        undefined,
        true
      )
      const data = response.data
      setTasks(data)
    }

    fetchData()
  }, [])

  // console.log(tasks)

  const handleTaskAddition = async (e) => {
    e.preventDefault()

    const data = new FormData(e.target)

    const taskName = data.get('taskName')
    const taskCode = data.get('taskCode')
    const taskType = data.get('taskType')
    const taskTeam = localStorage.getItem('team')

    if (taskName && taskCode && taskType) {
      const newTask = {
        name: taskName,
        type: taskType,
        shortcode: taskCode,
        team: taskTeam,
      }
      setTasks([...tasks, newTask])
      createItem('HRS_Work', newTask, true)
    }
  }

  // Function to handle deleting a task
  const handleDeleteButtonClick = async (index) => {
    // Get the task to be deleted
    if (confirm('Confirm Deletion ? ')) {
      const taskToDelete = tasks[index]

      await deleteItem('HRS_Work', taskToDelete.id, undefined, true)
      const updatedTasks = [...tasks]
      updatedTasks.splice(index, 1)
      setTasks(updatedTasks)
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
        <form
          onSubmit={handleTaskAddition}
          method="post"
          className={styles['form']}
        >
          <TextField
            // fullWidth
            label="Task Name"
            id="taskName"
            variant="filled"
            name="taskName"
          />
          &nbsp;
          <TextField
            // fullWidth
            label="Task Code"
            id="taskCode"
            variant="filled"
            name="taskCode"
          />
          &nbsp;
          <TextField
            // fullWidth
            label="Task Type"
            id="taskType"
            variant="filled"
            name="taskType"
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

export default Tasks

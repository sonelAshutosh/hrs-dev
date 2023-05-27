import ScheduleItem from '@/components/ScheduleItem'
import styles from '../../../styles/Index.module.css'
import useAPIData from '../../../../api.config/useAPIData'
import { useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'
import AddIcon from '@/svg/AddIcon'
import { router } from 'next/router'

function Index() {
  const { getItems } = useAPIData()
  const [scheduleItems, setScheduleItems] = useState([])

  const handleCreateSchedule = () => {
    router.push('createSchedule')
  }

  useEffect(() => {
    const team = Number(localStorage.getItem('team'))
    async function fetchData() {
      const response = await getItems(
        'HRS_Schedule_Defination',
        undefined,
        undefined,
        undefined,
        { team: team },
        undefined,
        undefined,
        true
      )
      const data = response.data
      setScheduleItems(data)
    }

    fetchData()
  }, [])
  // console.log(scheduleItems)

  return (
    <div className={styles['my-schedules']}>
      <div className={styles['my-schedules-header']}>
        <TextField
          fullWidth
          label="Search"
          id="fullWidth filled"
          variant="filled"
        />
      </div>
      <div className={styles['my-schedules-body']}>
        {scheduleItems.map((scheduleItem) => {
          return (
            <ScheduleItem
              key={scheduleItem.id}
              scheduleId={scheduleItem.id}
              title={scheduleItem.title}
              shortcode={scheduleItem.shortcode}
              session={scheduleItem.session}
            />
          )
        })}
      </div>
      <div className={styles['add-button']} onClick={handleCreateSchedule}>
        <button type="submit" className={styles['button']}>
          <AddIcon />
        </button>
      </div>
    </div>
  )
}

export default Index

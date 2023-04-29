import ScheduleItem from '@/components/ScheduleItem'
import styles from '../../styles/Index.module.css'
import useAPIData from '../../../api.config/useAPIData'
import { useEffect, useState } from 'react'

export default function index() {
  const { getItems } = useAPIData()
  const [scheduleItems, setScheduleItems] = useState([])

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
      const data = await response.data
      setScheduleItems(data)
    }

    fetchData()
  }, [])
  // console.log(scheduleItems)

  return (
    <div className={styles['my-schedules']}>
      {scheduleItems.map((scheduleItem) => {
        return (
          <ScheduleItem
            key={scheduleItem.id}
            title={scheduleItem.title}
            shortcode={scheduleItem.shortcode}
            session={scheduleItem.session}
          />
        )
      })}
    </div>
  )
}

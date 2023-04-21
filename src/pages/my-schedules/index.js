import ScheduleItem from '@/components/ScheduleItem'
import styles from '../../styles/Index.module.css'

export default function index() {
  return (
    <div className={styles['my-schedules']}>
      <ScheduleItem />
      <ScheduleItem />
      <ScheduleItem />
      <ScheduleItem />
      <ScheduleItem />
      <ScheduleItem />
      <ScheduleItem />
      <ScheduleItem />
    </div>
  )
}

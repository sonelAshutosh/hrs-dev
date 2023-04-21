import ScheduleItem from '@/components/ScheduleItem'
import styles from '../../styles/Index.module.css'
import { useRouter } from 'next/router'

export default function index() {
  const router = useRouter()
  const handleSchedule = () => {
    router.push('/my-schedules/schedule-1')
  }
  return (
    <div className={styles['my-schedules']}>
      <ScheduleItem onClick={handleSchedule} />
      <ScheduleItem onClick={handleSchedule} />
      <ScheduleItem onClick={handleSchedule} />
      <ScheduleItem onClick={handleSchedule} />
      <ScheduleItem onClick={handleSchedule} />
      <ScheduleItem onClick={handleSchedule} />
      <ScheduleItem onClick={handleSchedule} />
      <ScheduleItem onClick={handleSchedule} />
      {/* <ScheduleItem />
      <ScheduleItem />
      <ScheduleItem />
      <ScheduleItem />
      <ScheduleItem />
      <ScheduleItem />
      <ScheduleItem />
      <ScheduleItem />
      <ScheduleItem />
      <ScheduleItem /> */}
    </div>
  )
}

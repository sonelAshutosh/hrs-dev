import React, { useEffect, useState } from 'react'
import styles from '../styles/CurrentScheduleAnalytics.module.css'
import useAPIData from '../../api.config/useAPIData'
import { useRouter } from 'next/router'

function CurrentScheduleAnalytics() {
  const { getItems } = useAPIData()
  const router = useRouter()

  const { sid } = router.query
  const param = sid ? sid.toString().split('_') : []

  const [humans, setHumans] = useState([])
  const [slots, setSlots] = useState([])
  const [workHours, setWorkHours] = useState([])

  const fetchWorkData = async () => {
    const responseRow = await getItems(
      'HRS_Row',
      undefined,
      undefined,
      undefined,
      { schedule: Number(param[1]) },
      undefined,
      undefined,
      true
    )
    const dataRow = responseRow.data

    const slotPromises = dataRow.map((row) =>
      getItems(
        'HRS_Slot',
        undefined,
        undefined,
        undefined,
        { row: row.id },
        'id',
        undefined,
        true
      )
    )

    const slotResponses = await Promise.all(slotPromises)
    const slotData = slotResponses.map((response) => response.data)

    setSlots(slotData)
  }

  const fetchHumans = async () => {
    const team = localStorage.getItem('team')
    const response = await getItems(
      'HRS_HumanResource',
      undefined,
      undefined,
      undefined,
      { team },
      undefined,
      undefined,
      true
    )
    const data = response.data
    setHumans(data)
  }

  const calculateCount = () => {
    const temp = humans.map((human) => {
      const humanSlots = slots.flatMap((row) =>
        row.filter((slot) => slot.human === human.id)
      )
      return { humanId: human.id, workHours: humanSlots.length }
    })
    setWorkHours(temp)
  }

  const handleRefresh = async () => {
    await fetchHumans()
    if (sid) await fetchWorkData()
  }

  useEffect(() => {
    fetchHumans()
    if (sid) fetchWorkData()
  }, [])

  useEffect(() => {
    calculateCount()
  }, [slots])

  if (!sid) return null
  return (
    <div className={styles.container}>
      <div className={styles['container-content']}>
        <div className={styles.table}>
          <div className={styles['table-row']}>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-1']}`}
            >
              Name
            </div>
            <div
              className={`${styles['table-heading']} ${styles['table-heading-2']}`}
            >
              Work hr/w
            </div>
          </div>
          <div>
            {humans.map((human) => (
              <div key={human.id} className={styles['table-row']}>
                <div>{human.name}</div>
                <div>
                  {workHours.find((w) => w.humanId === human.id)?.workHours ||
                    0}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.button} onClick={handleRefresh}>
        Refresh
      </div>
    </div>
  )
}

export default CurrentScheduleAnalytics

import React, { useEffect, useState } from 'react'
import styles from '../styles/CurrentScheduleAnalytics.module.css'
import useAPIData from '../../api.config/useAPIData'
import { useRouter } from 'next/router'

function CurretScheduleAnalytics() {
  const { getItems } = useAPIData()
  const router = useRouter()

  const { sid } = router.query
  var param = []
  if (sid != undefined) param = (sid + '').split('_')

  const [humans, setHumans] = useState([])
  const [slots, setSlots] = useState([])

  //   const fetchWorkData = async () => {
  //     const resposeCol = await getItems(
  //       'HRS_Column',
  //       undefined,
  //       undefined,
  //       undefined,
  //       { schedule: Number(param[1]) },
  //       undefined,
  //       undefined,
  //       true
  //     )
  //     const dataCol = resposeCol.data

  //     const responeRow = await getItems(
  //       'HRS_Row',
  //       undefined,
  //       undefined,
  //       undefined,
  //       { schedule: Number(param[1]) },
  //       undefined,
  //       undefined,
  //       true
  //     )
  //     const dataRow = responeRow.data

  //     const slot = []
  //     for (let i = 0; i < dataRow.length; i++) {
  //       const response = await getItems(
  //         'HRS_Slot',
  //         undefined,
  //         undefined,
  //         undefined,
  //         { row: dataRow[i].id },
  //         'id',
  //         undefined,
  //         true
  //       )
  //       const data = response.data
  //       slot.push(data)
  //     }
  //     setSlots(slot)
  //   }

  const fetchData = async () => {
    const team = localStorage.getItem('team')
    const response = await getItems(
      'HRS_HumanResource',
      undefined,
      undefined,
      undefined,
      { team: team },
      undefined,
      undefined,
      true
    )
    const data = response.data
    setHumans(data)
  }

  const handleRefresh = () => {
    fetchData()
  }

  useEffect(() => {
    fetchData()
    // fetchWorkData()
  }, [])

  //   console.log(slots)

  if (sid == undefined) return <div></div>
  else
    return (
      <div className={styles['container']}>
        <div className={styles['container-content']}>
          <div className={styles['table']}>
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
                  <div>2</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles['button']} onClick={handleRefresh}>
          Refresh
        </div>
      </div>
    )
}

export default CurretScheduleAnalytics

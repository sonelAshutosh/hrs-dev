import React, { useState } from 'react'
import useAPIAuth from '../../../api.config/useAPIAuth'
import useAPIData from '../../../api.config/useAPIData'
import styles from '../../styles/Login.module.css'
import { useRouter } from 'next/router'

const Login = () => {
  const { getItems } = useAPIData()
  const { setUser } = useAPIAuth()
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    const data = new FormData(e.target)

    const userId = data.get('userId')
    const password = data.get('password')

    const user = { email: userId, password }
    const success = await setUser(user)

    // console.log(user)

    if (success) {
      const email = sessionStorage.getItem('userEmail')
      const userFetch = await getItems(
        'HRS_user',
        ['team'],
        undefined,
        undefined,
        { username: { _eq: email } },
        undefined,
        undefined,
        true
      )
      const team = userFetch.data[0].team

      localStorage.setItem('team', team)

      router.push('/admin')
    } else {
      alert('Incorrect Email / Password')
    }
  }

  return (
    <>
      <div className={styles['login-container']}>
        <div className={styles['login']}>
          <h1>LogIn</h1>
          <form
            // action={handleLogin}
            onSubmit={handleLogin}
            method="post"
            className="form"
          >
            <input
              type="text"
              id="userId"
              name="userId"
              placeholder="User Id"
              className="input"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="input"
            />
            <button className={styles['button']} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login

Login.getLayout = function PageLayout(page) {
  return <>{page} </>
}

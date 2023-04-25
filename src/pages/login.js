import React, { useState } from 'react'
import useAPIAuth from '../../api.config/useAPIAuth'
import styles from '../styles/Login.module.css'
import { useRouter } from 'next/router'

const Login = () => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const { setUser } = useAPIAuth()

  const handleUserIdChange = (e) => {
    setUserId(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async () => {
    const user = { email: userId, password }
    const success = await setUser(user)
    if (success) {
      router.push('/')
    } else {
      alert('Incorrect Email / Password')
    }
  }

  return (
    <div className={styles['login-container']}>
      <div className={styles['login']}>
        <h1>LogIn</h1>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={handleUserIdChange}
          placeholder="User Id"
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <div className={styles['button']} onClick={handleLogin}>
          Login
        </div>
      </div>
    </div>
  )
}

export default Login

Login.getLayout = function PageLayout(page) {
  return <>{page} </>
}

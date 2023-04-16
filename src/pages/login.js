import React, { useState } from 'react'
import styles from '../styles/Login.module.css'

const Login = () => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const handleUserIdChange = (e) => {
    setUserId(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    // Here you can implement your login logic
    console.log('User ID:', userId)
    console.log('Password:', password)
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

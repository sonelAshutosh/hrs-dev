import React, { useState } from 'react'
import useAPIAuth from '../../api.config/useAPIAuth'

function MyComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    loginStatus,
    setUser,
    logoutUser,
    getAuthHeader,
    getAuthURLParam,
    getUserEmail,
  } = useAPIAuth()

  const handleLogin = async () => {
    const user = { email, password }
    const success = await setUser(user)
    if (success) {
      console.log('User logged in successfully')
    } else {
      console.log('Login failed')
    }
  }

  const handleLogout = async () => {
    const success = await logoutUser()
    if (success) {
      console.log('User logged out successfully')
    } else {
      console.log('Logout failed')
    }
  }

  const fetchProtectedData = async () => {
    const authHeader = getAuthHeader()
    if (authHeader) {
      const response = await fetch('https://api.example.com/protected', {
        headers: {
          'Content-Type': 'application/json',
          ...authHeader,
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Protected data:', data)
      } else {
        console.log('Failed to fetch protected data')
      }
    } else {
      console.log('User is not authenticated')
    }
  }

  return (
    <div>
      <h1>Authentication Example</h1>
      <p>Login status: {loginStatus ? 'Logged in' : 'Logged out'}</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log in</button>
      <button onClick={handleLogout}>Log out</button>
      <button onClick={fetchProtectedData}>Fetch protected data</button>
    </div>
  )
}

export default MyComponent

// import React, { useState } from 'react'
// import useAPIAuth from '../../api.config/useAPIAuth'
// import styles from '../styles/Login.module.css'

// const Login = () => {
//   const [userId, setUserId] = useState('')
//   const [password, setPassword] = useState('')

//   const handleUserIdChange = (e) => {
//     setUserId(e.target.value)
//   }

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value)
//   }

//   const handleLogin = () => {
//     // Here you can implement your login logic
//     console.log('User ID:', userId)
//     console.log('Password:', password)
//   }

//   return (
//     <div className={styles['login-container']}>
//       <div className={styles['login']}>
//         <h1>LogIn</h1>
//         <input
//           type="text"
//           id="userId"
//           value={userId}
//           onChange={handleUserIdChange}
//           placeholder="User Id"
//         />
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={handlePasswordChange}
//           placeholder="Password"
//         />
//         <div className={styles['button']} onClick={handleLogin}>
//           Login
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login

// Login.getLayout = function PageLayout(page) {
//   return <>{page} </>
// }

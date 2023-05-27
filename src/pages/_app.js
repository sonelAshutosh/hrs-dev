import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useAPIAuth from '../../api.config/useAPIAuth'
import LoadingBar from 'react-top-loading-bar'
import Navbar from '@/components/Navbar'
import RightNavbar from '@/components/RightNavbar'
import UserProfile from '@/components/UserProfile'
import Image from 'next/image'

export default function App({ Component, pageProps }) {
  const [userProfile, setUserProfile] = useState(false)
  const [progress, setProgress] = useState(0)

  const { loginStatus } = useAPIAuth()
  const router = useRouter()

  const handleUserProfile = () => {
    setUserProfile(!userProfile)
  }

  // This function sometimes run some times dont run
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })

    setUserProfile(false)
  }, [loginStatus])

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return (
    <>
      <LoadingBar
        color="#5043cb"
        progress={progress}
        height={5}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="container">
        <div className="container-top">
          <Navbar />
          <div className="profile" onClick={handleUserProfile}>
            <Image
              src="/profile.jpg"
              width="50"
              height="50"
              alt="profile"
              srcSet=""
            />
          </div>
        </div>
        <div className="container-bottom">
          <div className="container-bottom-head">
            {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
          </div>
          <div className="container-bottom-body">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
      <UserProfile open={userProfile} />
      {/* <RightNavbar /> */}
    </>
  )
}

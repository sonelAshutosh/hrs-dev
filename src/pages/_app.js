import Link from 'next/link'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import SearchIcon from '@/svg/SearchIcon'
import MenuOpenIcon from '@/svg/MenuOpenIcon'
import MenuCloseIcon from '@/svg/MenuCloseIcon'
import LeftNavbar from '@/components/LeftNavbar'
import RightNavbar from '@/components/RightNavbar'
import UserProfile from '@/components/UserProfile'
import useAPIAuth from '../../api.config/useAPIAuth'
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'
import CurrentScheduleAnalytics from '@/components/CurrentScheduleAnalytics'

export default function App({ Component, pageProps }) {
  const [leftNav, setLeftNav] = useState(false)
  const [userProfile, setUserProfile] = useState(false)
  const [progress, setProgress] = useState(0)

  const { loginStatus } = useAPIAuth()
  const router = useRouter()

  const handleNavbar = () => {
    setLeftNav(!leftNav)
  }
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

    setLeftNav(false)
    setUserProfile(false)
    // console.log('This this ' + loginStatus)
    if (!loginStatus) {
      router.push('/login')
    }
  }, [loginStatus])

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }
  return (
    <>
      Changing the UI structure of the App
      <LoadingBar
        color="#6d28d9"
        progress={progress}
        height={5}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="App">
        <div className="container">
          <div className="header">
            <div className="navbar">
              <div className="menu-icon" onClick={handleNavbar}>
                {leftNav ? <MenuCloseIcon /> : <MenuOpenIcon />}
              </div>
              <div className="logo">
                <Link href="/">
                  <Image
                    src="/logo.jpg"
                    width="50"
                    height="50"
                    alt="logo"
                    srcSet=""
                    priority
                  />
                </Link>
              </div>
              <div className="search">
                <div className="search-logo">
                  <SearchIcon />
                </div>
                <div className="search-input">
                  <input type="text" />
                </div>
              </div>
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
          </div>
          <div className="body">
            <LeftNavbar open={leftNav} />
            <div className="center">
              <Component {...pageProps} />
            </div>
            <div className="right-info">
              <CurrentScheduleAnalytics />
            </div>
          </div>
          <div className="footer"></div>
        </div>
      </div>
      <UserProfile open={userProfile} />
      {/* <RightNavbar /> */}
    </>
  )
}

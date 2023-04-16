import Link from 'next/link'
import '@/styles/globals.css'
import { useState } from 'react'
import SearchIcon from '@/svg/SearchIcon'
import MenuOpenIcon from '@/svg/MenuOpenIcon'
import MenuCloseIcon from '@/svg/MenuCloseIcon'
import LeftNavbar from '@/components/LeftNavbar'
import RightNavbar from '@/components/RightNavbar'
import UserProfile from '@/components/UserProfile'

export default function App({ Component, pageProps }) {
  const [leftNav, setLeftNav] = useState(false)
  const [userProfile, setUserProfile] = useState(false)
  const handleNavbar = () => {
    setLeftNav(!leftNav)
  }
  const handleUserProfile = () => {
    setUserProfile(!userProfile)
  }
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }
  return (
    <>
      <div className="App">
        <div className="container">
          <div className="header">
            <div className="navbar">
              <div className="menu-icon" onClick={handleNavbar}>
                {leftNav ? <MenuCloseIcon /> : <MenuOpenIcon />}
              </div>
              <div className="logo">
                <Link href="/">
                  <img src="./logo.jpg" alt="logo" srcSet="" />
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
                <img src="/profile.jpg" alt="profile" />
              </div>
            </div>
          </div>
          <div className="body">
            <LeftNavbar open={leftNav} />
            <div className="center">
              <Component {...pageProps} />
            </div>
            <div className="right-info"></div>
          </div>
          <div className="footer"></div>
        </div>
      </div>
      <UserProfile open={userProfile} />
      <RightNavbar />
    </>
  )
}

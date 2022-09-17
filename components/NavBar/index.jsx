import React, { useState } from 'react'
import Link from 'next/link'
import styles from './NavBar.module.css'
import { MdMenu } from 'react-icons/md'
import { BsFillDice5Fill } from 'react-icons/bs'
import { FaHistory } from 'react-icons/fa'
import { MdSettings } from 'react-icons/md'

function NavBar () {
  const styleSpan = {
    backgroundColor: '#06C0B5'
  }
  const [styleHome, setStyleHome] = useState({})
  const [styleBed, setStyleBed] = useState({})
  const [styleSettings, setStyleSettings] = useState({})
  const clickHome = () => {
    setStyleHome(styleSpan)
    setStyleBed({})
    setStyleSettings({})
  }
  const clickBed = () => {
    setStyleHome({})
    setStyleBed(styleSpan)
    setStyleSettings({})
  }
  const clickSettings = () => {
    setStyleSettings(styleSpan)
    setStyleHome({})
    setStyleBed({})
  }
  return (
    <nav className={`${styles.navBar} bg-black text-white`}>
      <ul>
        <li className={styles.menu} title='Menu'>
          <MdMenu />
        </li>
        <Link href='/'>
          <li title='Bet' onClick={clickHome} style={styleHome}>
            <BsFillDice5Fill />
          </li>
        </Link>
        <Link href='/history'>
          <li title='History' onClick={clickBed} style={styleBed}>
            <FaHistory />
          </li>
        </Link>
        <li
          className={styles.settings}
          title='Settings'
          onClick={clickSettings}
          style={styleSettings}
        >
          <MdSettings />
        </li>
      </ul>
    </nav>
  )
}

export { NavBar }

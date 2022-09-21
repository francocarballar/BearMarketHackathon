import React, { useState } from 'react'
import Link from 'next/link'
import styles from './NavBar.module.css'
import { MdMenu } from 'react-icons/md'
import { BsFillDice5Fill } from 'react-icons/bs'
import { FaHistory } from 'react-icons/fa'
import { MdSettings } from 'react-icons/md'
import { BsFillPatchCheckFill } from 'react-icons/bs'

function NavBar () {
  const styleSpan = {
    backgroundColor: '#06C0B5'
  }
  const [styleHome, setStyleHome] = useState({})
  const [styleResults, setStyleResults] = useState({})
  const [styleHistory, setStyleHistory] = useState({})
  const [styleSettings, setStyleSettings] = useState({})
  const clickHome = () => {
    setStyleHome(styleSpan)
    setStyleResults({})
    setStyleHistory({})
    setStyleSettings({})
  }
  const clickResults = () => {
    setStyleHome({})
    setStyleResults(styleSpan)
    setStyleHistory({})
    setStyleSettings({})
  }
  const clickHistory = () => {
    setStyleHome({})
    setStyleResults({})
    setStyleHistory(styleSpan)
    setStyleSettings({})
  }
  const clickSettings = () => {
    setStyleSettings(styleSpan)
    setStyleHome({})
    setStyleResults({})
    setStyleHistory({})
  }
  const [viewMenu, setViewMenu] = useState(false)
  const clickMenu = () => {
    const body = document.body
    body.classList.toggle('width-menu')
    setViewMenu(!viewMenu)
  }
  return (
    <nav className={`${styles.navBar} bg-black text-white`}>
      <ul>
        <li className={styles.menu} title='Menu' onClick={clickMenu}>
          <MdMenu />
        </li>
        <Link href='/'>
          <li title='Bet' onClick={clickHome} style={styleHome}>
            <BsFillDice5Fill />
            {viewMenu && <p>Bets</p>}
          </li>
        </Link>
        <Link href='/results'>
          <li title='Results' onClick={clickResults} style={styleResults}>
            <BsFillPatchCheckFill />
            {viewMenu && <p>Results</p>}
          </li>
        </Link>
        <Link href='/history'>
          <li title='History' onClick={clickHistory} style={styleHistory}>
            <FaHistory />
            {viewMenu && <p>History</p>}
          </li>
        </Link>
        <li
          className={styles.settings}
          title='Settings'
          onClick={clickSettings}
          style={styleSettings}
        >
          <MdSettings />
          {viewMenu && <p>Settings</p>}
        </li>
      </ul>
    </nav>
  )
}

export { NavBar }

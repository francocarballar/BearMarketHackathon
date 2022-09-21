import React, { createContext, useState, useEffect } from 'react'

const Context = createContext()

function Provider ({ children }) {
  const [myAddress, setAddress] = useState('')
  const [mySession, setMySession] = useState({})
  const [visibleModal, setVisibleModal] = useState(false)
  const [date, setDate] = useState('')
  const [stateWidth, setWindowWidth] = useState(0)
  const [viewTablet, setViewTablet] = useState(false)
  const updateDimensions = () => {
    const width = window.innerWidth
    setWindowWidth(width)
    if (width <= 768) {
      setViewTablet(false)
    } else if (width >= 768) {
      setViewTablet(true)
    }
  }
  let width
  useEffect(() => {
    width = window.innerWidth
    setWindowWidth(width)
    if (width >= 768) {
      setViewTablet(true)
    }
    window.addEventListener('resize', updateDimensions)
  }, [stateWidth])
  return (
    <Context.Provider
      value={{
        myAddress,
        setAddress,
        mySession,
        setMySession,
        visibleModal,
        setVisibleModal,
        date,
        setDate,
        stateWidth,
        setWindowWidth,
        viewTablet,
        setViewTablet
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }

import React, { createContext, useState } from 'react'

const Context = createContext()

function Provider ({ children }) {
  const [myAddress, setAddress] = useState('')
  const [mySession, setMySession] = useState({})
  const [visibleModal, setVisibleModal] = useState(false)
  const [date, setDate] = useState('')
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
        setDate
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }

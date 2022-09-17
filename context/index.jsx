import React, { createContext, useState } from 'react'

const Context = createContext()

function Provider ({ children }) {
  const [myAddress, setAddress] = useState('')
  const [mySession, setMySession] = useState({})
  return (
    <Context.Provider
      value={{ myAddress, setAddress, mySession, setMySession }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }

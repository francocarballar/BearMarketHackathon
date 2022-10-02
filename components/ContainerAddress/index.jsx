import React, { useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import { MdCheckCircleOutline } from 'react-icons/md'
import { useContext } from 'react'
import { Context } from '../../context'

function ContainerAddress () {
  const [alertCopy, setAlertCopy] = useState(false)
  const { myAddress } = useContext(Context)
  console.log("header user address", myAddress)

  const addressLength = Number(myAddress.length)
  const subAddress = addressLength - 4
  const firstDigits = myAddress.substring(0, 5)
  const lastDigits = myAddress.substring(subAddress, addressLength)
  const copyAddress = () => {
    navigator.clipboard
      .writeText(myAddress)
      .then(setAlertCopy(true))
      .then(
        setTimeout(() => {
          setAlertCopy(false)
        }, 3000)
      )
  }
  return (
    <div className='flex justify-center items-center flex-col text-center w-full p-6'>
      <p
        className='flex items-center cursor-pointer relative text-white font-bold'
        onClick={copyAddress}
      >
        {`${firstDigits}...${lastDigits}`}
        <span className='mx-1'>
          <MdContentCopy />
        </span>
        {alertCopy && (
          <div
            className='flex justify-center items-center rounded-md h-6 w-full absolute top-0'
            style={{ backgroundColor: 'var(--semitransparent)' }}
          >
            <span className='text-green-500 textlg'>
              <MdCheckCircleOutline />
            </span>
          </div>
        )}
      </p>
    </div>
  )
}

export { ContainerAddress }

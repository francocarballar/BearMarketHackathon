import React, { useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import { MdCheckCircleOutline } from 'react-icons/md'

function ContainerAddress () {
  const [alertCopy, setAlertCopy] = useState(false)
  const address = '0x8c5841De344396945D6D7E5BB953a0ce1DF08aA6'
  const addressLength = Number(address.length)
  const subAddress = addressLength - 4
  const firstDigits = address.substring(0, 5)
  const lastDigits = address.substring(subAddress, addressLength)
  const copyAddress = () => {
    navigator.clipboard
      .writeText(address)
      .then(setAlertCopy(true))
      .then(
        setTimeout(() => {
          setAlertCopy(false)
        }, 3000)
      )
  }
  return (
    <div className='flex justify-center items-center flex-col text-center w-full p-6'>
      <h3 className='text-lg font-bold'>Account</h3>
      <p
        className='flex items-center cursor-pointer relative'
        onClick={copyAddress}
      >
        {`${firstDigits}...${lastDigits}`}
        <span className='mx-1'>
          <MdContentCopy />
        </span>
        {alertCopy && (
          <div
            className='flex justify-center items-center rounded-md h-6 w-32 absolute top-0'
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

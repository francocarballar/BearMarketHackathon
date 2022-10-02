import React, { useContext } from 'react'
import { Context } from '../../context'
import { Modal, Input, Button, Text } from '@nextui-org/react'
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite
} from 'wagmi'

import {
  daiAbi,
  betContractAbi,
  daiContractAddress,

} from '../../constants'

import getUserWinnerMatches from '../../helpers/getUserWinnerMatches'


function CardResults ({ homeScore, awayScore, status, gameId }) {
  const { myAddress } = useContext(Context)
  console.log("user address", myAddress)

  const claimRewards = usePrepareContractWrite({
    chainId: 0x5,
    addressOrName: '0xB4a090fe9c54A7Ee9908Bfd5903b0a4f54689e32',
    contractInterface: betContractAbi,
    functionName: 'claimRewards',
    args: ['3901002']
  })
  const _claimRewards = useContractWrite(claimRewards.config)

  return (
    <article className=' max-w-xs shadow-xl rounded-2xl border-gray-700 text-center border-2 w-full flex flex-col md:max-w-5xl'>
      <div className='flex flex-row justify-center items-center text-white text-center py-3 px-5 md:flex-col md:justify-center md:gap-3'>
        <p className='text-primary'>{gameId} : {homeScore} - {awayScore} ({status})</p>
      </div>
      <div className='px-6 py-6 pt-3 flex flex-col justify-center items-center gap-3 md:flex-row'>
        <div className='flex justify-center items-center w-full'>
          <button
            className='w-full px-4 py-2 rounded-md text-white bg-primary font-bold md:w-48 lg:w-40'
            onClick={() => _claimRewards.write()}
          >
            Claim
          </button>
        </div>
      </div>
    </article>
  )
}

export { CardResults }

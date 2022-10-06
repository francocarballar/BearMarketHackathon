import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../context'
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite
} from 'wagmi'

import {
  betContractAbi,
  superBetContractAddress,
} from '../../constants'

import { Modal, Input, Button, Text } from '@nextui-org/react'

import Moralis from 'moralis-v1'

function CardResults({ gameId, choice }) {
  const { myAddress } = useContext(Context)

  const [homeTeam, setHomeTeam] = useState("")
  const [awayTeam, setAwayTeam] = useState("")
  const [homeScore, setHomeScore] = useState("")
  const [awayScore, setAwayScore] = useState("")
  const [claimButton, setClaimButton] = useState(false)
  const [status, setStatus] = useState("")


  const betsCreated = Moralis.Object.extend('betCreated')
  const queryBetsCreated = new Moralis.Query(betsCreated)

  const matchResolved = Moralis.Object.extend('matchResolved')
  const queryMatchResolved = new Moralis.Query(matchResolved)

  async function checkClaim() {
    queryMatchResolved.equalTo("gameId", gameId)
    try {
      const _match = await queryMatchResolved.first();
      if (_match.get("winner") == choice) {
        setClaimButton(true);
      }
    }
    catch {
    }
  }

  async function getTeamNames() {
    queryBetsCreated.equalTo("gameId", gameId)
    const _match = await queryBetsCreated.first();
    setHomeTeam(_match.get("homeTeam"))
    setAwayTeam(_match.get("awayTeam"))
  }

  async function getScores() {
    queryMatchResolved.equalTo("gameId", gameId)
    try {
      const _match = await queryMatchResolved.first();
      setHomeScore(_match.get("homeScore"))
      setAwayScore(_match.get("awayScore"))
      setStatus("finished")
    }
    catch {
      setStatus("Match pending")
    }
  }

  useEffect(() => {
    getTeamNames()
    getScores()
    checkClaim()
  }, [])

  const claimRewards = usePrepareContractWrite({
    chainId: 0x5,
    addressOrName: superBetContractAddress,
    contractInterface: betContractAbi,
    functionName: 'claimRewards',
    args: [gameId]
  })
  const _claimRewards = useContractWrite(claimRewards.config)

  return (


    <article className=' max-w-xs shadow-xl rounded-2xl border-gray-700 text-center border-2 w-full flex flex-col md:max-w-5xl'>
      <div className='flex flex-row justify-center items-center text-white text-center py-3 px-5 md:flex-col md:justify-center md:gap-3'>
        {status === "finished" ? (
          <div>
          <h3 className='font-bold md:w-90'>{homeTeam} ({homeScore}) - {awayTeam} ({awayScore}) </h3>
          <p className='text-primary'>FINISHED</p>
          </div>
            ) : (
          <div>
          <h3 className='font-bold md:w-90'> {homeTeam} VS {awayTeam}</h3>
          <p className='text-primary'>PENDING</p>
          </div>
        )
        }
      </div>
      <div className='px-6 py-6 pt-3 flex flex-col justify-center items-center gap-3 md:flex-row'>
        <div className='flex justify-center items-center w-full'>

          {claimButton === true ? (<div>

            <Text id='modal-title' b size={13}>
              You can claim {} DAI
            </Text>

            <Button
              className='w-full px-4 py-2 rounded-md text-white bg-primary font-bold md:w-48 lg:w-40'
              onClick={() => _claimRewards.write()}
            >
              Claim
            </Button></div>
          ) : (
            <span></span>
          )
          }

        </div>
      </div>
    </article>
  )
}

export { CardResults }

import React, { useContext, useState, useEffect } from 'react'
import { Modal, Input, Button, Text } from '@nextui-org/react'
import { Context } from '../../context'
import { ethers } from 'ethers'
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite
} from 'wagmi'
import {
  daiAbi,
  betContractAbi,
  daiContractAddress,
  superBetContractAddress,

} from '../../constants'
import { useSelector } from 'react-redux'

function ModalComponent() {

  const userChoice = useSelector((state) => state.bet.value)
  const choiceSelected = userChoice[1]
  const gameIdSelected = userChoice[0]
  const odd = userChoice[2]

  const [inputValue, setInputValue] = useState("")
  const [inputValueParsed, setInputValueParsed] = useState("0")
  const [earn, setEarn] = useState("0")


  useEffect(() => {
    if (inputValue != "") {
      const iv = ethers.utils.parseUnits(inputValue, 18)
      const ivp = ethers.utils.formatUnits(iv, "wei")
      setInputValueParsed(ivp)
      const _earn = inputValue * odd / 10 ** 18
      setEarn(_earn )
    }

  }, [inputValue]);



  const { visibleModal, setVisibleModal } = useContext(Context)
   const approve = usePrepareContractWrite({
    chainId: 0x5,
    addressOrName: daiContractAddress,
    contractInterface: daiAbi,
    functionName: 'approve',
    args: [
      superBetContractAddress,
      inputValueParsed
    ]
  })
  const _approve = useContractWrite(approve.config)
  const setBet = usePrepareContractWrite({
    chainId: 0x5,
    addressOrName: superBetContractAddress,
    contractInterface: betContractAbi,
    functionName: 'setBet',
    args: [gameIdSelected, inputValueParsed, choiceSelected]

  })
  const _setBet = useContractWrite(setBet.config)

  return (
    <div>
      <Modal
        closeButton
        blur
        aria-labelledby='modal-title'
        open={visibleModal}
        onClose={() => 
          {
            setVisibleModal(false)
            setInputValue("")
            setEarn("")
          }
        
        }      >
        <Modal.Header>
          <Text id='modal-title' b size={18}>
            Enter your bet
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color='primary'
            size='lg'
            placeholder='5000'
            onChange={(e) => {
              setInputValue(e.target.value)
            }
            }
            value={inputValue}
          />

          <Text id='modal-title' b size={13}>
            You will earn {earn}
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            className='text-white'
            flat
            onClick={() => {
              _approve.write()
            }}
          >
            Approve
          </Button>
          <Button
            auto
            className='text-primary'
            onClick={() => {
              setVisibleModal(false)
              _setBet.write()

            }}
          >
            Place Bet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export { ModalComponent }

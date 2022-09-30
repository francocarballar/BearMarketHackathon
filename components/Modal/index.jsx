import React, { useContext, useState } from 'react'
import { Modal, Input, Button, Text } from '@nextui-org/react'
import { Context } from '../../context'

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
  gameCreateRequestId,
  gameResolveRequestId
} from '../../constants'

function ModalComponent () {
  
  const [inputValue, setInputValue] = useState("")

  const { visibleModal, setVisibleModal } = useContext(Context)
  const closeHandler = () => {
    setVisibleModal(false)
  }
  const approve = usePrepareContractWrite({
    chainId: 0x5,
    addressOrName: daiContractAddress,
    contractInterface: daiAbi,
    functionName: 'approve',
    args: [
      superBetContractAddress,
      inputValue
    ]
  })
  const _approve = useContractWrite(approve.config)
  const setBet = usePrepareContractWrite({
    chainId: 0x5,
    addressOrName: superBetContractAddress,
    contractInterface: betContractAbi,
    functionName: 'setBet',
    args: ['3901002', inputValue, '0']
  })
  const _setBet = useContractWrite(setBet.config)
  return (
    <div>
      <Modal
        closeButton
        blur
        aria-labelledby='modal-title'
        open={visibleModal}
        onClose={closeHandler}
      >
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
            onChange={ (e) => {
              e.preventDefault()
              setInputValue(e.target.value)
            }
          }
          value={inputValue}
          />
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
            Make Bet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export { ModalComponent }

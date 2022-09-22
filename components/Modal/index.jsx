import React, { useContext } from 'react'
import { Modal, Input, Button, Text } from '@nextui-org/react'
import { Context } from '../../context'
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite
} from 'wagmi'

// import {
//   daiAbi,
//   betContractAbi,
//   daiContractAddress,
//   superBetContractAddress,
//   gameCreateRequestId,
//   gameResolveRequestId
// } from '../../constants'

import setup from '../../API/infinityBetsSetup'
import API from '../../API/infinityBetsAPI'


function ModalComponent () {
  const { visibleModal, setVisibleModal } = useContext(Context)
  const closeHandler = () => {
    setVisibleModal(false)
  }
  // const approve = usePrepareContractWrite({
  //   chainId: 0x5,
  //   addressOrName: '0x29282139fD1A88ccAED6d3bb7f547192144C0f95',
  //   contractInterface: daiAbi,
  //   functionName: 'approve',
  //   args: [
  //     '0xB4a090fe9c54A7Ee9908Bfd5903b0a4f54689e32',
  //     '100000000000000000000'
  //   ]
  // })


  const approve = usePrepareContractWrite(API.approve(setup))

  const _approve = useContractWrite(approve.config)
  

  
  const setBet = usePrepareContractWrite({
    chainId: 0x5,
    addressOrName: '0xB4a090fe9c54A7Ee9908Bfd5903b0a4f54689e32',
    contractInterface: betContractAbi,
    functionName: 'setBet',
    args: ['3901002', '100000000000000000000', '0']
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

import React, { useContext } from 'react'
import { Modal, Input, Button, Text } from '@nextui-org/react'
import { Context } from '../../context'

function ModalComponent () {
  const { visibleModal, setVisibleModal } = useContext(Context)
  const closeHandler = () => {
    setVisibleModal(false)
  }
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
          <Button auto flat color='error' onClick={closeHandler}>
            Close
          </Button>
          <Button auto className='text-primary' onClick={closeHandler}>
            Make Bet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export { ModalComponent }

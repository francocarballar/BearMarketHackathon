import React from 'react'
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import { Grid, Button } from '@nextui-org/react'

function ButtonLogin ({ typeConnector, name }) {
  const { connectAsync, connectors } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { push } = useRouter()
  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync()
    }
    const { account, chain } = await connectAsync({
      connector: connectors[typeConnector]
    })
    const userData = { address: account, chain: chain.id, network: 'evm' }
    const { data } = await axios.post('/api/auth/request-message', userData, {
      headers: {
        'content-type': 'application/json'
      }
    })
    const message = data.message
    const signature = await signMessageAsync({ message })
    const { url } = await signIn('credentials', {
      message,
      signature,
      redirect: false,
      callbackUrl: '/'
    })
    push(url)
  }
  return (
    <div>
      <Grid>
        <Button
          bordered
          color='primary'
          auto
          ghost
          onClick={() => handleAuth()}
          className='w-60'
        >
          {`Connect with ${name}`}
        </Button>
      </Grid>
    </div>
  )
}

export { ButtonLogin }

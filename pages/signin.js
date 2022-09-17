import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { signIn } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Context } from '../context'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import { Grid, Button } from '@nextui-org/react'

function SignIn ({ session }) {
  const { setMySession } = useContext(Context)
  setMySession(session)
  const { connectAsync } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { push } = useRouter()

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync()
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector()
    })

    const userData = { address: account, chain: chain.id, network: 'evm' }

    const { data } = await axios.post('/api/auth/request-message', userData, {
      headers: {
        'content-type': 'application/json'
      }
    })

    const message = data.message

    const signature = await signMessageAsync({ message })

    // redirect user after success authentication to '/user' page
    const { url } = await signIn('credentials', {
      message,
      signature,
      redirect: false,
      callbackUrl: '/'
    })
    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    push(url)
  }

  return (
    <main className={styles.main}>
      <section
        className={`${styles.section_signin} flex justify-center items-center w-full bg-gray-900`}
      >
        <div className='flex flex-col justify-center items-center gap-6 py-14 px-8 border-gray-700 border-2 rounded-2xl text-white text-center'>
          <h3 className='text-3xl font-bold'>Start bet</h3>
          <p>To be able to use this app you have to connect your wallet</p>
          <Grid>
            <Button
              bordered
              color='primary'
              auto
              ghost
              onClick={() => handleAuth()}
            >
              Lauch dapp
            </Button>
          </Grid>
        </div>
      </section>
    </main>
  )
}

export default SignIn

export async function getServerSideProps (context) {
  const session = await getSession(context)

  // redirect if not authenticated
  if (!session) {
    return {
      props: { session }
    }
  }
}

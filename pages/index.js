import styles from '../styles/Home.module.css'
import { getSession, signOut } from 'next-auth/react'
import { CardMatch } from '../components/CardMatch'
import { Portada } from '../components/Portada'
import { ModalComponent } from '../components/Modal'
import { useContext, useState, useEffect } from 'react'
import { Context } from '../context'
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
} from '../constants'
import moment from 'moment'

export default function Home ({ user, session }) {
  const { setAddress, setMySession } = useContext(Context)
  setAddress(user.address)
  setMySession(session)

  const getGameCreate0 = useContractRead({
    chain: 0x5,
    addressOrName: '0xB4a090fe9c54A7Ee9908Bfd5903b0a4f54689e32',
    contractInterface: betContractAbi,
    functionName: 'getGameCreate',
    args: [
      '0x7a29c3073173a85e601535e5c66e4a3012be719a61e4d146d1ec30241349efcb',
      '0'
    ]
  })
  const [gameCreate0, setGameCreate0] = useState('')
  console.log(getGameCreate0)

  useEffect(() => {
    // if (data != undefined) {
    setGameCreate0(getGameCreate0.data)
    // }
  }, [])

  console.log('partido:', gameCreate0)
  console.log('fecha:', moment.unix(gameCreate0[1]).format('LLLL'))

  return (
    <main className={styles.main}>
      <Portada />
      <ModalComponent />
      <section className='w-full flex flex-col justify-start items-center gap-8 p-7 pb-44'>
        <CardMatch
          team1='Real Sociedad'
          team2='Atletico de Madrid'
          date='Saturday, September 3, 2022'
        />
        <CardMatch
          team1='Real Sociedad'
          team2='Atletico de Madrid'
          date='Saturday, September 3, 2022'
        />
        <CardMatch
          team1='Real Sociedad'
          team2='Atletico de Madrid'
          date='Saturday, September 3, 2022'
        />
        <CardMatch
          team1='Real Sociedad'
          team2='Atletico de Madrid'
          date='Saturday, September 3, 2022'
        />
      </section>
    </main>
  )
}

export async function getServerSideProps (context) {
  const session = await getSession(context)

  // redirect if not authenticated
  if (!session) {
    return {
      props: { session },
      redirect: {
        destination: '/signin',
        permanent: false
      }
    }
  }

  return {
    props: { user: session.user, session }
  }
}

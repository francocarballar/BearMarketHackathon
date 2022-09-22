import styles from '../styles/Home.module.css'
import { getSession, signOut } from 'next-auth/react'
import { CardMatch } from '../components/CardMatch'
import { Portada } from '../components/Portada'
import { ModalComponent } from '../components/Modal'
import { useContext, useState, useEffect } from 'react'
import { Context } from '../context'
import setup from '../API/infinityBetsSetup'
import API from '../API/infinityBetsAPI'
import { useContractRead } from 'wagmi'


import moment from 'moment'

export default function Home ({ user, session }) {
  const { setAddress, setMySession, date, setDate } = useContext(Context)
  setAddress(user.address)
  setMySession(session)

  // const getGameCreate = useContractRead({
  //   chain: 0x5,
  //   addressOrName: '0xB4a090fe9c54A7Ee9908Bfd5903b0a4f54689e32',
  //   contractInterface: betContractAbi,
  //   functionName: 'getGameCreate',
  //   args: [
  //     '0x7a29c3073173a85e601535e5c66e4a3012be719a61e4d146d1ec30241349efcb',
  //     '0'
  //   ]
  // })

  const getGameCreate = useContractRead(API.gameCreate(setup))
  const [gameCreate, setGameCreate] = useState('')

  // const getGameResolve = useContractRead({
  //   chain: 0x5,
  //   addressOrName: '0xB4a090fe9c54A7Ee9908Bfd5903b0a4f54689e32',
  //   contractInterface: betContractAbi,
  //   functionName: 'getGameResolve',
  //   args: [
  //     '0x27055d93d1ea190ee64eb80706c466bfb96151db8fabb41e6f0418643feba1ef',
  //     '0'
  //   ]
  // })

  const getGameResolve = useContractRead(API.gameResolve(setup))
  const [gameResolve, setGameResolve] = useState('')

  useEffect(() => {
    if (getGameCreate.data != undefined) {
      setGameCreate(getGameCreate.data)
    }
    if (getGameResolve.data != undefined) {
      setGameResolve(getGameResolve.data)
    }
  }, [])
  useEffect(() => {
    setDate(moment.unix(gameCreate[1]).format('DD MMMM'))
  }, [gameResolve])

  return (
    <main className={styles.main}>
      <Portada />
      <ModalComponent />
      <section className='w-full flex flex-col justify-start items-center gap-8 p-7 pb-44'>
        {/* <CardMatch team1={gameCreate[2]} team2={gameCreate[3]} date={date} /> */}
        <CardMatch
          team1='Real Sociedad'
          team2='Atletico de Madrid'
          date='14 September'
        />
        <CardMatch
          team1='Real Sociedad'
          team2='Atletico de Madrid'
          date='14 September'
        />
        <CardMatch
          team1='Real Sociedad'
          team2='Atletico de Madrid'
          date='14 September'
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

import styles from '../styles/Home.module.css'
import { getSession } from 'next-auth/react'
import { Loading, Grid } from '@nextui-org/react'
import { CardMatch } from '../components/CardMatch'
import { Portada } from '../components/Portada'
import { ModalComponent } from '../components/Modal'
import { useContext, useState, useEffect } from 'react'
import { Context } from '../context'
import moment from 'moment'
import getMatches from '../helpers/getMatches'

import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment } from './slices/counterSlice'

export default function Home ({ user, session }) {
  const count = useSelector((state) => state.counter.value)
  const bet = useSelector((state) => state.bet.value)

  const dispatch = useDispatch()

  const { setAddress, setMySession } = useContext(Context)
  const [matches, setMatches] = useState([])
  
  async function getAllMatches () {
    console.log("inside getAllMatches")
    const allMatches = await getMatches()
    setMatches(allMatches)
  }

  useEffect(() => {
    getAllMatches()
  },[])

  useEffect(() => {
    setAddress(user.address)
  }, [setAddress, user])
  
  useEffect(() => {
    setMySession(session)
  }, [setMySession, session])

  return (
    <main className={styles.main}>
      <Portada />
      <ModalComponent />
      <section className='w-full flex flex-col justify-start items-center gap-8 p-7 pb-44'>
        {matches.length === 0 ? (
          <Grid>
            <Loading type='points' size='lg' />
          </Grid>
        ) : (
          matches.map(match => ( 
            
            <CardMatch
              team1={match.homeTeam}
              team2={match.awayTeam}
              homeOdd={match.homeOdd}
              awayOdd={match.awayOdd}
              tiedOdd={match.tiedOdd}
              gameId={match.gameId}
              date={moment.unix(match.date).format('DD MMMM')}
              time={moment.unix(match.date).format('LT')}
              key={match.gameId}
            /> 
          ))
        )}



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

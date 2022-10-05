import React from 'react'
import styles from '../styles/Home.module.css'
import { CardResults } from '../components/CardResults'
import { useContext, useState, useEffect } from 'react'
import { Loading, Grid } from '@nextui-org/react'
import getUserBets from '../helpers/getUserBets'


export default function results() {
  const [userBets, setUsersBets] = useState([])

  async function getMatchesFinished() {
    const _userBets = await getUserBets()
    setUsersBets(_userBets)
  }

  useEffect(() => {
    getMatchesFinished()
  }, [])

  return (
    <main className={styles.main}>
      <section className='w-full flex flex-col justify-start items-center gap-8 p-7 pb-44'>
 
        {userBets.length === 0 ? (
          <Grid>
            <Loading type='points' size='lg' />
          </Grid>
        ) : (
          userBets.map(match => 
            <CardResults
            status={match.status}
            gameId={match.gameId}     
            choice = {match.choice}       
            key={match.gameId}
            />
          )
        )
        
      }
       
      </section>
    </main>
  )
}

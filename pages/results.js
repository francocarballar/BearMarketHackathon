import React from 'react'
import styles from '../styles/Home.module.css'
import { CardResults } from '../components/CardResults'
import getMatches from '../helpers/getMatchesFinished'
import { useContext, useState, useEffect } from 'react'
import { Loading, Grid } from '@nextui-org/react'
import getUserWinnerMatches from '../helpers/getUserWinnerMatches'
import { Context } from '../context'




export default function results() {
  const [matchesFinished, setMatchesFinished] = useState([])
  const [userWinnerMatches, setUserWinnerMatches] = useState([])
  const { myAddress } = useContext(Context)


  async function getMatchesFinished() {
    const matchesFinished  = await getMatches()
    const userWinnerMatches = await getUserWinnerMatches(myAddress)

    setMatchesFinished(matchesFinished)
    setUserWinnerMatches(userWinnerMatches)
  }

  useEffect(() => {
    getMatchesFinished()
  }, [])

  return (
    <main className={styles.main}>
      <section className='w-full flex flex-col justify-start items-center gap-8 p-7 pb-44'>
        {/* <CardResults
          team1='Real Sociedad'
          team2='Atletico de Madrid'
          date='Saturday, September 3, 2022'
        /> */}

        {matchesFinished.length === 0 ? (
          <Grid>
            <Loading type='points' size='lg' />
          </Grid>
        ) : (
          matchesFinished.map(match => {
            // if(userWinnerMatches.includes(match.gameId )) {
            // (
            <CardResults
            homeScore={match.homeScore}
            awayScore={match.awayScore}
            status={match.status}
            gameId={match.gameId}            
            key={match.gameId}
            />
          // )}
         })
        )}
      </section>
    </main>
  )
}

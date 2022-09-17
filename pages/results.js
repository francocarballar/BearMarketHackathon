import React from 'react'
import styles from '../styles/Home.module.css'
import { CardResults } from '../components/CardResults'

export default function results () {
  return (
    <main className={styles.main}>
      <section className='w-full flex flex-col justify-start items-center gap-8 p-7 pb-44'>
        <CardResults
          team1='Real Sociedad'
          team2='Atletico de Madrid'
          date='Saturday, September 3, 2022'
        />
      </section>
    </main>
  )
}

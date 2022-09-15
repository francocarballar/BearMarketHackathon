import styles from '../styles/Home.module.css'
import { ContainerAddress } from '../components/ContainerAddress'
import { CardMatch } from '../components/CardMatch'

export default function Home () {
  return (
    <>
      <ContainerAddress />
      <section className='w-full flex flex-col justify-start items-center gap-8'>
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
    </>
  )
}

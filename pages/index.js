import styles from '../styles/Home.module.css'
import { getSession, signOut } from 'next-auth/react'
import { ContainerAddress } from '../components/ContainerAddress'
import { CardMatch } from '../components/CardMatch'
import { useContext } from 'react'
import { Context } from '../context'

export default function Home ({ user, session }) {
  const { setAddress, setMySession } = useContext(Context)
  setAddress(user.address)
  setMySession(session)
  return (
    <main className={styles.main}>
      <ContainerAddress />
      <section className='w-full flex flex-col justify-start items-center gap-8 md:grid md:grid-cols-2 md:place-items-center lg:grid-cols-3'>
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

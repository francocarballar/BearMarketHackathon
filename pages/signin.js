import { getSession } from 'next-auth/react'
import { useContext } from 'react'
import { Context } from '../context'
import { useConnect } from 'wagmi'
import styles from '../styles/Home.module.css'
import { ButtonLogin } from '../components/ButtonLogin'

function SignIn ({ session }) {
  const { setMySession } = useContext(Context)
  setMySession(session)
  const { connectors } = useConnect()
  return (
    <main className={styles.main}>
      <section
        className={`${styles.section_signin} flex justify-center items-center w-full bg-gray-900`}
      >
        <div className='flex flex-col justify-center items-center gap-6 py-14 px-8 border-gray-700 border-2 rounded-2xl text-white text-center'>
          <h3 className='text-3xl font-bold'>Start bet</h3>
          <p>To be able to use this app you have to connect your wallet</p>
          {connectors.map((connector, index) => (
            <ButtonLogin
              key={connector.name}
              name={connector.name}
              typeConnector={index}
            />
          ))}
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

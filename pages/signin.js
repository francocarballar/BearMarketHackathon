import { getSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../context'
import { useConnect } from 'wagmi'
import { ButtonLogin } from '../components/ButtonLogin'
import { LayoutSignin } from '../components/LayoutSignin'

function SignIn ({ session }) {
  const { setMySession, viewTablet } = useContext(Context)
  useEffect(() => {
    setMySession(session)
  }, [setMySession, session])
  const { connectors } = useConnect()
  if (viewTablet) {
    return (
      <LayoutSignin>
        {connectors.map((connector, index) => (
          <ButtonLogin
            key={connector.name}
            name={connector.name}
            typeConnector={index}
          />
        ))}
      </LayoutSignin>
    )
  } else {
    return (
      <LayoutSignin>
        <ButtonLogin
          key={connectors[2].name}
          name={connectors[2].name}
          typeConnector={2}
        />
        <ButtonLogin
          key={connectors[1].name}
          name={connectors[1].name}
          typeConnector={1}
        />
      </LayoutSignin>
    )
  }
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

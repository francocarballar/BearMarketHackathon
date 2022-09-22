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
import Moralis_v2 from 'moralis'
import Moralis from "moralis-v1"

const _gameCreateRequesIdsArray = []


//CONSULTA A LA BASE DE DATOS:
async function getRequestIds() {
  await Moralis_v2.start({ apiKey: "O3i5jPl78uSeh61yMkj2W4iaTXgZtch2cmiCngwcwTJPbfmgcqnmSiGZvtgOwel7" });

  const serverUrl = "https://dcnqrknq91by.usemoralis.com:2053/server";
  const appId = "4uiRUothrilXBqrtJLaCow0Xs9K7GgFWZ6IXbVYg";
  const masterKey = "4uiRUothrilXBqrtJLaCow0Xs9K7GgFWZ6IXbVYg";
  await Moralis.start({ serverUrl, appId, masterKey });

  const RequestIds = Moralis.Object.extend("RequestIds");
  const query = new Moralis.Query(RequestIds);
  const results = await query.find();
  //Itero el total de requestId en la base de datos
  for (let i = 0; i < results.length; i++) {
    const object = results[i];
    const __requestId = object.get("uid");
    //Obtengo el la cantidad de partidos por fecha  
    const getGameCreateStructLengthOptions = {
      chain: 0x5,
      address: "0xBccA419D284548856927ef789EbE6Fe6bc8de665",
      functionName: "getGameCreateStructLength",
      abi: betContractAbi,
      params: {
        _requestId: __requestId,
      },
    };
    try {
      const getGameCreateStructLength = await Moralis_v2.EvmApi.utils.runContractFunction(getGameCreateStructLengthOptions)
      const _getGameCreateStructLength = getGameCreateStructLength.data;
      console.log("__getGameCreateStructLength", _getGameCreateStructLength)
      //Itero el total de partidos por gameCreate, osea la catidad de partidos en un dia
      for (let i = 0; i < _getGameCreateStructLength; i++) {
        const getGameCreateOptions = {
          chain: 0x5,
          address: "0xBccA419D284548856927ef789EbE6Fe6bc8de665",
          functionName: "getGameCreate",
          abi: betContractAbi,
          params: {
            _requestId: __requestId,
            _idx: String(i)
          },
        };
        try {
          const gameCreate = await Moralis_v2.EvmApi.utils.runContractFunction(getGameCreateOptions)
          const _gameCreate = gameCreate.data;
          // console.log("_gameCreate", _gameCreate)
          if(_gameCreateRequesIdsArray.includes(_gameCreate)) {
          } else {
            _gameCreateRequesIdsArray.push(_gameCreate)
          } 
        } catch (e) {
          console.log("no es un game create")
        }
      }
    } catch (e) {
      console.log("no es un game create, pero puede ser un game resolve")
      // try {
      //   const gameResolve = await Moralis_v2.EvmApi.utils.runContractFunction(getGameResolveOptions)
      // } catch (e) {
      //   console.log("este requestId no tiene ninguna informacion")
      // }

    }
  }

  console.log("termino la iteracion")
  console.log("tamaño del array: ", _gameCreateRequesIdsArray.length)
  return (_gameCreateRequesIdsArray)
}

export default function Home({ user, session }) {
  const [gameCreateRequesIdsArray, setgameCreateRequesIdsArray] = useState('')
  async function setRequestIds() {
    const _getRequestIds = await getRequestIds()
    console.log("ESTOY EN EL USE EFFECT")
    setRequestIds()
    setgameCreateRequesIdsArray(_getRequestIds)
  }

  useEffect(() => {
    setRequestIds()
  }, [])


  const { setAddress, setMySession, date, setDate } = useContext(Context)
  useEffect(() => {
    setAddress(user.address)

  }, [setAddress, user])
  useEffect(() => {
    setMySession(session)
  }, [setMySession, session])
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
  const getGameResolve0 = useContractRead({
    chain: 0x5,
    addressOrName: '0xB4a090fe9c54A7Ee9908Bfd5903b0a4f54689e32',
    contractInterface: betContractAbi,
    functionName: 'getGameResolve',
    args: [
      '0x27055d93d1ea190ee64eb80706c466bfb96151db8fabb41e6f0418643feba1ef',
      '0'
    ]
  })
  const [gameResolve0, setGameResolve0] = useState('')
  useEffect(() => {
    if (getGameCreate0.data !== undefined) {
      setGameCreate0(getGameCreate0.data)
    }
    if (getGameResolve0.data !== undefined) {
      setGameResolve0(getGameResolve0.data)
    }
  }, [setGameResolve0, setGameCreate0, getGameCreate0, getGameResolve0])
  useEffect(() => {
    setDate(moment.unix(gameCreate0[1]).format('LLLL'))
  }, [setDate, gameCreate0])

  return (
    <main className={styles.main}>
      <Portada />
      <ModalComponent />
      <section className='w-full flex flex-col justify-start items-center gap-8 p-7 pb-44'>
        <CardMatch team1={gameCreate0[2]} team2={gameCreate0[3]} date={date} />
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
      <div>{gameCreateRequesIdsArray}</div>
    </main>
  )
}

export async function getServerSideProps(context) {
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

  //CONSULETAS WEB3 API 
  // await Moralis_v2.start({ apiKey: process.env.MORALIS_API_KEY });

  // const getGameCreateLengthOptions = {
  //   chain: 0x5,
  //   address: "0xBccA419D284548856927ef789EbE6Fe6bc8de665",
  //   functionName: "getGameCreateStructLength",
  //   abi: betContractAbi,
  //   params: {
  //     _requestId: "0x577ebf111b88b1bba1343909c63f52ad1a933f883ea42299393a7d85d024a99d",
  //   },
  // };
  // const gameCreateLength = await Moralis_v2.EvmApi.utils.runContractFunction(getGameCreateLengthOptions)
  // const _gameCreateLength = gameCreateLength.data;
  // console.log("_gameCreateLength", _gameCreateLength)




  return {
    props: { user: session.user, session }
  }
}

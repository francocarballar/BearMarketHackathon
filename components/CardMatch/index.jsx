import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { Context } from '../../context'
import { ethers } from 'ethers'

import { useSelector, useDispatch } from 'react-redux'
import { setUserChoice } from '../../pages/slices/betSlice'




function CardMatch ({ team1, team2, date, time, homeOdd, awayOdd, tiedOdd, gameId }) {
  const dispatch = useDispatch()


  const { setVisibleModal } = useContext(Context)
  const versus = `${team1} vs. ${team2}`
  const styleButtonBet = {
    color: 'var(--primary-color)',
    backgroundColor: 'var(--background-color)',
    border: '4px solid var(--primary-color)'
  }
  const [styleHome, setStyleHome] = useState({})
  const [styleAway, setStyleAway] = useState({})
  const [styleTie, setStyleTie] = useState({})
  const clickHome = () => {
    setStyleHome(styleButtonBet)
    setStyleAway({})
    setStyleTie({})
    dispatch(setUserChoice([gameId,"0"]))
  }
  const clickAway = () => {
    setStyleHome({})
    setStyleAway(styleButtonBet)
    setStyleTie({})
    dispatch(setUserChoice([gameId,"1"]))
  }
  const clickTie = () => {
    setStyleHome({})
    setStyleAway({})
    setStyleTie(styleButtonBet)
    dispatch(setUserChoice([gameId,"2"]))
  }
  const [ieemageSrc1, setImageSrc1] = useState('')
  var imageSrc1
  var imageSrc2
  const SSC_Napoli = '/img/logo-SSC_Napoli.png'
  // if (team1 === 'Ajax') {
  //   imageSrc1 = '/img/logo-ajax.png'
  // }
  switch (team1) {
    case 'Ajax':
      imageSrc1 = '/img/logo-ajax.png'
      break
    case 'SSC Napoli':
      imageSrc1 = '/img/logo-SSC_Napoli.png'
      break
    case 'Liverpool':
      imageSrc1 = '/img/logo-liverpool.png'
      break
    case 'Rangers':
      imageSrc1 = '/img/logo-rangers.png'
      break
    case 'FC Porto':
      imageSrc1 = '/img/logo-FC_Porto.png'
      break
    case 'Bayer Leverkusen':
      imageSrc1 = '/img/logo-Bayer_Leverkusen.png'
      break
    case 'Club Brugge':
      imageSrc1 = '/img/logo-Club_Brugge.png'
      break
    case 'Atletico Madrid':
      imageSrc1 = '/img/logo-Atletico_Madrid.png'
      break
    case 'Bayern Munich':
      imageSrc1 = '/img/logo-Bayern_Munich.png'
      break
    case 'Viktoria Plzen':
      imageSrc1 = '/img/logo-Viktoria_Plzen.png'
      break
    case 'Inter':
      imageSrc1 = '/img/logo-inter.png'
      break
    case 'Barcelona':
      imageSrc1 = '/img/logo-barcelona.png'
      break
    case 'Marseille':
      imageSrc1 = '/img/logo-marseille.png'
      break
    case 'Sporting CP':
      imageSrc1 = '/img/logo-Sporting_CP.png'
      break
    case 'Eintracht Frankfurt':
      imageSrc1 = '/img/logo-Eintracht_Frankfurt.png'
      break
    case 'Tottenham Hotspur':
      imageSrc1 = '/img/logo-Tottenham_Hotspurt.png'
      break
    case 'Salzburg':
      imageSrc1 = '/img/logo-salzburg.png'
      break
    case 'Dinamo Zagreb':
      imageSrc1 = '/img/logo-Dinamo_Zagreb.png'
      break
    case 'Chelsea':
      imageSrc1 = '/img/logo-chelsea.png'
      break
    case 'AC Milan':
      imageSrc1 = '/img/logo-AC_Milan.png'
      break
    case 'RB Leipzig':
      imageSrc1 = '/img/logo-RB_Leipzig.png'
      break
    case 'Celtic':
      imageSrc1 = '/img/logo-celtic.png'
      break
    case 'Real Madrid':
      imageSrc1 = '/img/logo-Real_Madrid.png'
      break
    case 'Shakhtar Donetsk':
      imageSrc1 = '/img/logo-Shakhtar_Donetsk.png'
      break
    case 'Manchester City':
      imageSrc1 = '/img/logo-Manchester_City.png'
      break
    case 'FC Koebenhavn':
      imageSrc1 = '/img/logo-FC_Koebenhavn.png'
      break
    case 'Sevilla':
      imageSrc1 = '/img/logo-sevilla.png'
      break
    case 'Borussia Dortmund':
      imageSrc1 = '/img/logo-Borussia_Dortmund.png'
      break
    case 'Juventus':
      imageSrc1 = '/img/logo-juventus.png'
      break
    case 'Maccabi Haifa':
      imageSrc1 = '/img/logo-Maccabi_Haifa.png'
      break
    case 'Benfica':
      imageSrc1 = '/img/logo-benfica.png'
      break
    case 'Paris Saint':
      imageSrc1 = '/img/logo-Paris_Saint.png'
      break
  }
  switch (team2) {
    case 'Ajax':
      imageSrc2 = '/img/logo-ajax.png'
      break
    case 'SSC Napoli':
      imageSrc2 = '/img/logo-SSC_Napoli.png'
      break
    case 'Liverpool':
      imageSrc2 = '/img/logo-liverpool.png'
      break
    case 'Rangers':
      imageSrc2 = '/img/logo-rangers.png'
      break
    case 'FC Porto':
      imageSrc2 = '/img/logo-FC_Porto.png'
      break
    case 'Bayer Leverkusen':
      imageSrc2 = '/img/logo-Bayer_Leverkusen.png'
      break
    case 'Club Brugge':
      imageSrc2 = '/img/logo-Club_Brugge.png'
      break
    case 'Atletico Madrid':
      imageSrc2 = '/img/logo-Atletico_Madrid.png'
      break
    case 'Bayern Munich':
      imageSrc2 = '/img/logo-Bayern_Munich.png'
      break
    case 'Viktoria Plzen':
      imageSrc2 = '/img/logo-Viktoria_Plzen.png'
      break
    case 'Inter':
      imageSrc2 = '/img/logo-inter.png'
      break
    case 'Barcelona':
      imageSrc2 = '/img/logo-barcelona.png'
      break
    case 'Marseille':
      imageSrc2 = '/img/logo-marseille.png'
      break
    case 'Sporting CP':
      imageSrc2 = '/img/logo-Sporting_CP.png'
      break
    case 'Eintracht Frankfurt':
      imageSrc2 = '/img/logo-Eintracht_Frankfurt.png'
      break
    case 'Tottenham Hotspur':
      imageSrc2 = '/img/logo-Tottenham_Hotspurt.png'
      break
    case 'Salzburg':
      imageSrc2 = '/img/logo-salzburg.png'
      break
    case 'Dinamo Zagreb':
      imageSrc2 = '/img/logo-Dinamo_Zagreb.png'
      break
    case 'Chelsea':
      imageSrc2 = '/img/logo-chelsea.png'
      break
    case 'AC Milan':
      imageSrc2 = '/img/logo-AC_Milan.png'
      break
    case 'RB Leipzig':
      imageSrc2 = '/img/logo-RB_Leipzig.png'
      break
    case 'Celtic':
      imageSrc2 = '/img/logo-celtic.png'
      break
    case 'Real Madrid':
      imageSrc2 = '/img/logo-Real_Madrid.png'
      break
    case 'Shakhtar Donetsk':
      imageSrc2 = '/img/logo-Shakhtar_Donetsk.png'
      break
    case 'Manchester City':
      imageSrc2 = '/img/logo-Manchester_City.png'
      break
    case 'FC Koebenhavn':
      imageSrc2 = '/img/logo-FC_Koebenhavn.png'
      break
    case 'Sevilla':
      imageSrc2 = '/img/logo-sevilla.png'
      break
    case 'Borussia Dortmund':
      imageSrc2 = '/img/logo-Borussia_Dortmund.png'
      break
    case 'Juventus':
      imageSrc2 = '/img/logo-juventus.png'
      break
    case 'Maccabi Haifa':
      imageSrc2 = '/img/logo-Maccabi_Haifa.png'
      break
    case 'Benfica':
      imageSrc2 = '/img/logo-benfica.png'
      break
    case 'Paris Saint':
      imageSrc2 = '/img/logo-Paris_Saint.png'
      break
  }
  return (
    <article className=' max-w-xs shadow-xl rounded-2xl border-gray-700 border-2 w-full md:flex md:flex-row md:max-w-4xl'>
      <div className='flex flex-row justify-between items-center text-white py-3 px-5 md:flex-col md:justify-center md:gap-3'>
        <p>{time}</p>
        <p className='text-primary'>{date}</p>
      </div>
      <div className='flex flex-row justify-between items-center gap-3 text-center text-white py-3 px-5 md:justify-center md:w-80'>
        {/* <Image
          src={imageSrc1}
          alt={team1}
          width={50}
          height={50}
          layout='fixed'
          objectFit='contain'
        /> */}
        <h3 className='font-bold md:w-40'>{versus}</h3>
        {/* <Image
          src={imageSrc2}
          alt={team2}
          width={50}
          height={50}
          layout='fixed'
          objectFit='contain'
        /> */}
      </div>
      <div className='px-6 py-6 pt-3 flex flex-col justify-center items-center gap-3 md:flex-row'>
        <div className='flex justify-center items-center gap-3'>
          <div className='flex flex-col gap-3 justify-center items-center text-center'>
            <p className='text-white'>1</p>
            <button
              className='px-4 py-2 rounded-md w-20 md:w-30 text-white bg-gray-600 font-bold cursor-pointer'
              style={styleHome}
              onClick={clickHome}
            >
             {ethers.utils.formatEther(homeOdd)} 
            </button>
          </div>
          <div className='flex flex-col gap-3 justify-center items-center text-center'>
            <p className='text-white'>X</p>
            <button
              className='px-4 py-2 rounded-md w-20 md:w-30 text-white bg-gray-600 font-bold cursor-pointer'
              style={styleTie}
              onClick={clickTie}
            >
              {ethers.utils.formatEther(tiedOdd)}
            </button>
          </div>
          <div className='flex flex-col gap-3 justify-center items-center text-center'>
            <p className='text-white'>2</p>
            <button
              className='px-4 py-2 rounded-md w-20 md:w-30 text-white bg-gray-600 font-bold cursor-pointer'
              style={styleAway}
              onClick={clickAway}
            >
              {ethers.utils.formatEther(awayOdd)}
            </button>
          </div>
         
        </div>
        <div className='flex justify-center items-center w-full md:pt-10'>
          <button
            className='w-full px-4 py-2 rounded-md text-white bg-primary font-bold md:w-30'
            onClick={() => setVisibleModal(true)}
          >
            Place Bet
          </button>
        </div>
      </div>
    </article>
  )
}

export { CardMatch }

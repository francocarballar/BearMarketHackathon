import React, { useContext } from 'react'
import { Context } from '../../context'
import styles from './CardMarch.module.css'

function CardMatch ({ team1, team2, date }) {
  const { setVisibleModal } = useContext(Context)
  const versus = `${team1} vs. ${team2}`
  return (
    <article className=' max-w-xs shadow-xl rounded-2xl border-gray-700 border-2 w-full md:flex md:flex-row md:max-w-5xl'>
      <div className='flex flex-row justify-between items-center text-white py-3 px-5 md:flex-col md:justify-center md:gap-3'>
        <p>19:30</p>
        <p className='text-primary'>{date}</p>
      </div>
      <div className='flex flex-row justify-between items-center gap-3 text-white py-3 px-5 md:flex-col md:justify-center'>
        <h3 className='font-bold md:hidden'>{versus}</h3>
        <h3 className='font-bold hidden md:block'>{team1}</h3>
        <h3 className='font-bold hidden md:block'>{team2}</h3>
      </div>
      <div className='px-6 py-6 pt-3 flex flex-col justify-center items-center gap-3 md:flex-row'>
        <div className='flex justify-center items-center gap-3'>
          <div className='flex flex-col gap-3 justify-center items-center text-center'>
            <p className='text-white'>Home</p>
            <input
              type='radio'
              name='bet'
              id='Home'
              className={styles.inputRadioBet}
            />
            <label
              className='px-4 py-2 rounded-md w-20 md:w-30 lg:w-40 text-white bg-gray-600 font-bold cursor-pointer'
              htmlFor='Home'
            >
              2,1
            </label>
          </div>
          <div className='flex flex-col gap-3 justify-center items-center text-center'>
            <p className='text-white'>Away</p>
            <input
              type='radio'
              name='bet'
              id='Away'
              className={styles.inputRadioBet}
            />
            <label
              className='px-4 py-2 rounded-md w-20 md:w-30 lg:w-40 text-white bg-gray-600 font-bold cursor-pointer'
              htmlFor='Away'
            >
              3,6
            </label>
          </div>
          <div className='flex flex-col gap-3 justify-center items-center text-center'>
            <p className='text-white'>Tie</p>
            <input
              type='radio'
              name='bet'
              id='Tie'
              className={styles.inputRadioBet}
            />
            <label
              className='px-4 py-2 rounded-md w-20 md:w-30 lg:w-40 text-white bg-gray-600 font-bold cursor-pointer'
              htmlFor='Tie'
            >
              3,6
            </label>
          </div>
        </div>
        <div className='flex justify-center items-center w-full md:pt-10'>
          <button
            className='w-full px-4 py-2 rounded-md text-white bg-primary font-bold md:w-32 lg:w-40'
            onClick={() => setVisibleModal(true)}
          >
            Make Bet
          </button>
        </div>
      </div>
    </article>
  )
}

export { CardMatch }

import React from 'react'
import styles from './CardMatch.module.css'

function CardMatch ({ team1, team2, date }) {
  const versus = `${team1} vs. ${team2}`
  return (
    <article className='w-4/5 shadow-xl rounded-2xl'>
      <div className={styles.background}>
        <h3 className='text-2xl font-bold'>{versus}</h3>
        <h4>{date}</h4>
      </div>
      <div className='flex flex-col justify-center items-start px-4 pt-6'>
        <div>
          <input type='radio' id='team1' name='teams' value={team1} />
          <label for={team1} className='mx-2'>
            {team1}
          </label>
        </div>
        <div>
          <input type='radio' id='team2' name='teams' value={team2} />
          <label for={team2} className='mx-2'>
            {team2}
          </label>
        </div>
      </div>
      <div className='px-3 py-6 flex justify-center items-center gap-3'>
        <button className='px-4 py-2 rounded-md text-green-500 font-bold border-green-500 border-2 hover:text-white hover:bg-green-500'>
          Gana
        </button>
        <button className='px-4 py-2 rounded-md text-gray-700 font-bold border-gray-700 border-2 hover:text-white hover:bg-gray-700'>
          Empata
        </button>
        <button className='px-4 py-2 rounded-md text-red-500 font-bold border-red-500 border-2 hover:text-white hover:bg-red-500'>
          Pierde
        </button>
      </div>
    </article>
  )
}

export { CardMatch }

import React, { useState } from 'react'
import styles from './CardMatch.module.css'
import { Radio } from '@nextui-org/react'
import { Input, Grid } from '@nextui-org/react'

function CardMatch ({ team1, team2, date }) {
  const [checked, setChecked] = useState('')
  const versus = `${team1} vs. ${team2}`
  return (
    <article className='w-4/5 shadow-xl rounded-2xl max-w-sm'>
      <div className={styles.background}>
        <h3 className='text-2xl font-bold'>{versus}</h3>
        <h4>{date}</h4>
      </div>
      <div className='flex flex-col justify-center items-start px-6 pt-8 w-full'>
        <Input
          underlined
          labelPlaceholder='Apuesta'
          color='secondary'
          fullWidth
        />
      </div>
      <div className='flex flex-col justify-center items-start px-6 pt-6'>
        <Radio.Group color='secondary' value={checked} onChange={setChecked}>
          <Radio value={team1}>{team1}</Radio>
          <Radio value={team2}>{team2}</Radio>
        </Radio.Group>
      </div>
      <div className='px-6 py-6 flex justify-center items-center gap-3'>
        <button className='px-4 py-2 rounded-md w-40 text-green-500 font-bold border-green-500 border-2 hover:text-white hover:bg-green-500'>
          Gana
        </button>
        <button className='px-4 py-2 rounded-md w-40 text-gray-700 font-bold border-gray-700 border-2 hover:text-white hover:bg-gray-700'>
          Empata
        </button>
        <button className='px-4 py-2 rounded-md w-40 text-red-500 font-bold border-red-500 border-2 hover:text-white hover:bg-red-500'>
          Pierde
        </button>
      </div>
    </article>
  )
}

export { CardMatch }

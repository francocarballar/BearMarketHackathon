import React from 'react'

function CardResults ({ team1, team2, date }) {
  const versus = `${team1} vs. ${team2}`
  return (
    <article className=' max-w-xs shadow-xl rounded-2xl border-gray-700 text-center border-2 w-full flex flex-col md:max-w-5xl'>
      <div className='flex flex-row justify-between items-center gap-3 text-white text-center py-3 px-5 md:flex-col md:justify-center'>
        <h3 className='text-2xl font-bold'>{versus}</h3>
      </div>
      <div className='flex flex-row justify-center items-center text-white text-center py-3 px-5 md:flex-col md:justify-center md:gap-3'>
        <p className='text-primary'>{date}</p>
      </div>

      <div className='px-6 py-6 pt-3 flex flex-col justify-center items-center gap-3 md:flex-row'>
        <div className='flex justify-center items-center w-full'>
          <button
            className='w-full px-4 py-2 rounded-md text-white bg-primary font-bold md:w-48 lg:w-40'
            onClick={() => setVisibleModal(true)}
          >
            Claim
          </button>
        </div>
      </div>
    </article>
  )
}

export { CardResults }

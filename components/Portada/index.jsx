import React from 'react'
import styles from './Portada.module.css'

function Portada () {
  return (
    <section
      className={`${styles.portada} flex justify-center items-center w-full h-64 bg-no-repeat bg-center`}
    >
      <div className='flex flex-col justify-center items-center gap-6 text-center text-white md:items-start'>
        <h1 className='text-3xl font-bold md:text-5xl'>
          Manchester vs Real Madrid
        </h1>
        <h3 className='font-bold md:text-xl'>UEFA Champions League</h3>
        <button className='text-white bg-slate-900 rounded-xl py-1 px-10'>
          View
        </button>
      </div>
    </section>
  )
}

export { Portada }

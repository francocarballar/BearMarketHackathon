import React from 'react'
import styles from './Portada.module.css'

function Portada () {
  return (
    <section
      className={`${styles.portada} flex justify-center align-center w-full h-64 bg-no-repeat bg-center`}
    >
      <div className='flex flex-col justify-center items-start gap-6 text-white'>
        <h1 className='text-5xl font-bold'>Manchester vs Real Madrid</h1>
        <h3 className='text-xl font-bold'>UEFA Champions League</h3>
        <button className='text-white bg-slate-900 rounded-xl py-1 px-10'>
          View
        </button>
      </div>
    </section>
  )
}

export { Portada }

import React from 'react'
import styles from '../../styles/Home.module.css'

function LayoutSignin ({ children }) {
  return (
    <main className={styles.main}>
      <section
        className={`${styles.section_signin} flex justify-center items-center w-full bg-gray-900`}
      >
        <div className='flex flex-col justify-center items-center gap-6 py-14 px-8 border-gray-700 border-2 rounded-2xl text-white text-center'>
          <h3 className='text-3xl font-bold'>Start bet</h3>
          <p>To be able to use this app you have to connect your wallet</p>
          {children}
        </div>
      </section>
    </main>
  )
}

export { LayoutSignin }

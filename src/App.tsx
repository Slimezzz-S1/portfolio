import { useState } from 'react'
import Header from './Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <section className='flex justify-between h-screen'>
        <div className='bg-red-600 h-full w-full'>
          This is the left side of the portfolio hero/
        </div>

        <div className='bg-blue-600 h-full w-full'>
          This is the right side of the portfolio hero/
        </div>
      </section>
    </>
  )
}

export default App

import SocialLinks from './SocialLink'
import Header from './Header'
import { useEffect, useState } from 'react'

function App() {
  const roles : string[] = ["Front-End Developer", "3D Artist", "A really really long role name", "something else"]
  const [heroRole, setHeroRole] = useState(roles[0])

  useEffect(() => {
    const delayEachLetter : number = 30
    const RoleStay : number = 2000
    const getRoleDuration : (role : string) => number = (role: string) => delayEachLetter * role.length + RoleStay

    const runCycle = () => {
      roles.map((role, index) => {
          let startTime = 0
          for (let i = 0; i < index; i++) {
            startTime += getRoleDuration(roles[i])
          }

          setTimeout(() => {
            for (let i : number = 0; i < role.length + 1; i++) {
              setTimeout(() => {
                setHeroRole(role.slice(0, i))
              }, delayEachLetter * i)
            }

            for (let i : number = role.length; i >= 0; i--) {
              setTimeout(() => {
                setHeroRole(role.slice(0, i))
              }, (delayEachLetter * (role.length - i)) + RoleStay)
            }
          }, startTime)
        }
    )}

    let totalCycleDuration = 0
    roles.forEach(role => {
      totalCycleDuration += getRoleDuration(role)
    })

    runCycle()
    const interval = setInterval(runCycle, totalCycleDuration)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Header />
      <section className='flex sm:flex-col lg:flex-row px-10 py-2 gap-5 justify-between h-screen'>
        <div className='h-full w-full flex flex-col items-start justify-center gap-6'>
          <h3 className='text-2xl'>
            Hi, I'm
          </h3>

          <h2 className='min-h-[9rem] text-7xl flex items-center'>
            {heroRole}
          </h2>

          <p>
            Just a silly slime learning how to enjoy life the human way
          </p>

          <SocialLinks />
        </div>

        <div className='h-full w-full'>
          This is the right side of the portfolio hero
        </div>
      </section>
      <section className='h-screen'>

      </section>
    </>
  )
}

export default App

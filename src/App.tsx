import SocialLinks from './SocialLink'
import Header from './Header'
import { useEffect, useState } from 'react'

import heroPicture from './assets/images/hero.jpg'

import About from './About'
import Project from './Project'
import Skill from './Skill'

function App() {
  const roles : string[] = ["Front-End Developer", "3D Artist", "Steve", "something else"]
  const [heroRole, setHeroRole] = useState("")
  const [isCursor, setIsCursor] = useState(false)
  
  // useEffect(() => {
  //   const delayEachLetter : number = 30
  //   const RoleStay : number = 2000
  //   const getRoleDuration : (role : string) => number = (role: string) => delayEachLetter * role.length + RoleStay

  //   const runCycle = () => {
  //     roles.map((role, index) => {
  //         let startTime = 0
  //         for (let i = 0; i < index; i++) {
  //           startTime += getRoleDuration(roles[i])
  //         }

  //         setTimeout(() => {
  //           for (let i : number = 0; i < role.length + 1; i++) {
  //             setTimeout(() => {
  //               setHeroRole(role.slice(0, i))
  //             }, delayEachLetter * i)
  //           }

  //           for (let i : number = role.length; i >= 0; i--) {
  //             setTimeout(() => {
  //               setHeroRole(role.slice(0, i))
  //             }, (delayEachLetter * (role.length - i)) + RoleStay)
  //           }
  //         }, startTime)
  //       }
  //   )}

  //   let totalCycleDuration = 0
  //   roles.forEach(role => {
  //     totalCycleDuration += getRoleDuration(role)
  //   })

  //   runCycle()
  //   const interval = setInterval(runCycle, totalCycleDuration)

  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    const delayEachLetter : number = 20
    const textHold : number = 2000
    const getTextDuration : (role : string) => number = (role : string) => {
      return role.length * delayEachLetter + textHold + (role.length * delayEachLetter)
    }
    let sumTime : number = 0

    const runCycle : () => void = () => {
      roles.map((role : string, index : number) => {
        let startTime = 0
        for (let i = 0; i < index; i++) startTime += getTextDuration(roles[i])
        
        sumTime = startTime + getTextDuration(role)

        setTimeout(() => {
          for (let i : number = 0; i < role.length + 1; i++) {
            setTimeout(() => {
              setHeroRole(role.slice(0, i))
            }, delayEachLetter * i)
          }

          for (let i : number = role.length; i >= 0; i--) {
            setTimeout(() => {
              setHeroRole(role.slice(0, i))
            }, delayEachLetter * role.length + textHold + (delayEachLetter * (role.length - i)))
          }
        }, startTime)
      })
    }

    runCycle()
    // console.log(sumTime)
    
    setInterval(() => {
      runCycle()
    }, sumTime)
    
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsCursor(prev => !prev)
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Header />

      <section id='test' className='flex sm:flex-col-reverse lg:flex-row px-10 py-10 gap-5 items-center justify-between w-screen min-h-240'>
        <div className='h-full w-full flex flex-col items-start justify-center gap-6'>
          <h3 className='text-2xl'>
            Hi, I'm
          </h3>

          <h2 className='lg:min-h-36 sm:min-h-18 text-7xl'>
            {heroRole}<span className={isCursor ? "text-foreground" : "text-background"}>_</span>
          </h2>

          <p>
            Just a silly slime learning how to enjoy life the human way
          </p>

          <SocialLinks />
        </div>

        <div className='flex lg:justify-end sm:justify-center items-center h-full w-full'>
          <div className='h-160 overflow-hidden rounded-2xl'>
            <img src={heroPicture} className='w-full h-full object-cover' />
          </div>
        </div>
      </section>

      <About />

      <Skill />

      <Project />
    </>
  )
}

export default App

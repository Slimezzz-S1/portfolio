import SocialLinks from './SocialLink'
import Header from './Header'
import { useEffect, useRef, useState } from 'react'

import heroPicture from './assets/images/hero.jpg'

import About from './About'
import Skill from './Skill'
import BuildWith from './BuildWith'
import Projects from './Project'

import { animate, stagger } from 'animejs'

function App() {
  const roles : string[] = ["Front-End Developer", "3D Artist", "Full-Stack Developer"]
  const [heroRole, setHeroRole] = useState("")
  const [isCursor, setIsCursor] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef) {
      return
    }

    animate(heroRef.current?.children!, {
      x : (_el, i) => [i == 0 ? "-100vw" : "100vw", 0],
      duration : 700,
      ease : "outSine",
      delay : stagger(500)
    })
  }, [])

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           console.log(entry.target)
  //         } else {
  //           console.log("Not visible")
  //         }
  //       })
  //     },

  //     { 
  //       root : null,
  //       rootMargin: "0px",
  //       scrollMargin: "0px",
  //       threshold: 0,
  //     }
  //   )

  //   observer.observe(document.querySelector("#test")!)
  //   return () => observer.disconnect()
  // }, [])
  
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

    setTimeout(() => {
      runCycle()
      // console.log(sumTime)
      
      setInterval(() => {
        runCycle()
      }, sumTime)
    }, 1200)
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

      <section ref={heroRef} className='flex flex-col-reverse lg:flex-row items-stretch justify-between min-h-240'>
        <div className='flex flex-col items-start justify-center gap-6 flex-1 rounded-l-2xl pl-10'>
          <h3 className='text-2xl'>
            Hi, I'm
          </h3>

          <h2 className='lg:min-h-36 min-h-42 sm:min-h-18 text-7xl'>
            {heroRole}<span className={isCursor ? "text-foreground" : "text-background"}>_</span>
          </h2>

          <p>
            Just a silly slime learning how to enjoy life the human way
          </p>

          <SocialLinks />
        </div>

        <div className='flex lg:justify-end justify-center items-center flex-1 rounded;r-2xl p-10 lg:p-0 lg:pr-10'>
          <div className='lg:h-128 h-full overflow-hidden rounded-2xl aspect-3/4'>
            <img src={heroPicture} className='w-full h-full object-cover' />
          </div>
        </div>
      </section>

      <BuildWith />

      <div className='flex flex-col gap-12 max-w-7xl mx-auto px-8 xl:px-0'>
        <About />

        <Skill />

        <Projects />
      </div>
    </>
  )
}

export default App

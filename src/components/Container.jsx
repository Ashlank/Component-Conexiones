import React from 'react'
import useLogic from '../hooks/useLogic'
import Sender from './Sender'
import Recipient from './Recipient'
import Line from './Line'

export default function Container() {
  const senders = ["Sender 1", "Sender 2", "Sender 3"]
  const recipients = ["Recipient 1", "Recipient 2", "Recipient 3"]

  const { isPressed,
          lines,
          firstPosition,
          lastPosition,
          handleMouseDown,
          handleMouseMove,
          handleMouseUp } = useLogic()

  return (
    <div className='w-full flex gap-8 relative' onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
      <svg className='absolute w-full -z-10'>
        {
          lines.map((line, index) => {
            return <Line start={line.start} end={line.end} key={line.id + index}/>
          })
        }
        {
          isPressed && <Line start={firstPosition} end={lastPosition}/>
        }
      </svg>
      <div className=' w-full flex flex-col gap-6'>
        {
          senders.map((s, i) => {
            return (
              <React.Fragment key={s+i}>
                <div className='Sender flex gap-4' id={s+i}>
                  <Sender sender={s} />
                  <button className='w-6 h-6 flex items-center justify-center rounded-[50%] border-black border-solid border-[2px] z-10 bg-white'
                          type='button'
                          onMouseDown={handleMouseDown}
                  >+</button>
                </div>
              </React.Fragment>
            )
        })
        }
      </div>
      <div className=' w-full flex flex-col gap-6'>
        {
          recipients.map((r, i) => {
            return (
              <React.Fragment key={r+i}>
                <div className='Recipient flex gap-4' id={r+i}>
                  <button className='w-6 h-6 flex items-center justify-center rounded-[50%] border-black border-solid border-[2px] z-10 bg-white'
                          type='button'
                          onMouseUp={handleMouseUp}
                  ></button>
                  <Recipient recipient={r} />
                </div>
              </React.Fragment>
            )
        })
        }
      </div>
    </div>
  )
}

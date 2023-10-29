import { useState } from "react"

export default function useLogic() {
  const [isPressed, setIsPressed] = useState(false)
  const [firstPosition, setFirstPosition] = useState({})
  const [lastPosition, setLastPosition] = useState({})
  const [lines, setLines] = useState([])

  const changePositions = (pos) => {
    setFirstPosition(pos)
    setLastPosition(pos)
  }

  const handleMouseMove = (e) => {
    if(isPressed) {
      setLastPosition({ x: e.pageX, y: e.pageY})
    }
  }

  const handleMouseDown = (e) => {
    changePositions({ x: e.pageX, y: e.pageY})
    setIsPressed(true)
  }

  const handleMouseUp = (e) => {
    e.stopPropagation()

    // Lógica para permitir una única conexión en el recipient
    const { id } = e.target.parentNode;
    const isAlreadyConnected = lines.find((elem) => elem.id === id)

    if(e.target.parentNode.classList[0] === 'Recipient' && isPressed && !isAlreadyConnected) {
      // Lógica al soltar en el botón
      setLines(prev => {
        const newLine = { start: firstPosition, end: lastPosition, id: id};
        return [...prev, newLine]
      })
      changePositions({})
    }
    setIsPressed(false)
  }

  return { isPressed, lines, firstPosition, lastPosition, handleMouseDown, handleMouseMove, handleMouseUp }
}
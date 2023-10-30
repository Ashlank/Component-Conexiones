import { useState, useRef } from "react"

export default function useLogic() {
  const [isPressed, setIsPressed] = useState(false)
  const [firstPosition, setFirstPosition] = useState({})
  const [lastPosition, setLastPosition] = useState({})
  const [lines, setLines] = useState([])

  const containerRef = useRef(null);

  const getCoords = (coord) => {
    const rect = containerRef.current.getBoundingClientRect()
    return { x: coord.x - rect.left, y: coord.y - rect.top}
  }

  const changePositions = (pos) => {
    setFirstPosition(pos)
    setLastPosition(pos)
  }

  const handleMouseMove = (e) => {
    if(isPressed) {
      const pos = getCoords({ x: e.clientX, y: e.clientY});
      setLastPosition(pos)
    }
  }

  const handleMouseDown = (e) => {
    const pos = getCoords({ x: e.clientX, y: e.clientY})
    changePositions(pos)
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

  return { isPressed, lines, firstPosition, lastPosition, containerRef, handleMouseDown, handleMouseMove, handleMouseUp }
}
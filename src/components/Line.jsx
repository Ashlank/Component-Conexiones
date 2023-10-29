export default function Line({ start, end }) {
  const c1 = {
    x: ((end.x - start.x) / 4) + start.x,
    y: (((end.y - start.y) / 4) + 5) + start.y,
  }
  const c2 = {
    x: ((end.x - start.x) / 4) * 2 + start.x,
    y: (((end.y - start.y) / 4) + 5) * 2 + start.y,
  }
  return (
    <path d={`M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`} stroke='black' fill='transparent' strokeDasharray={5} strokeWidth={2}></path>
  )
}
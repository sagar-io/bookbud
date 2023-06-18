export const Popup = ({text, isWarn}) => {
  const style = {
    backgroundColor: isWarn ? 'red': 'green',
    color: isWarn ? 'white': 'black'
  }
  return (
    <div style={style}>{text}</div>
  )
}

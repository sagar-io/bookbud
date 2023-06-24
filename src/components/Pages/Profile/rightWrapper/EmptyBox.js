import emptyImg from '../../../../assets/images/em-fl.png'

const style = {
    textAlign: 'center', 
    color:'gray',
}
export const EmptyBox = ({value}) => {
  return (
    <div style={style}>
        <img src={emptyImg} />
        <p>You haven't {value} any eBook yet.</p>
    </div>
  )
}

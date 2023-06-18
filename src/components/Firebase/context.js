import {createContext} from 'react'
const FirebaseContext = createContext(null)

// Higher Order Component (HOC)
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase = {firebase}/>}
    </FirebaseContext.Consumer>
)

export default FirebaseContext



import App from './components/App'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import Firebase, {FirebaseContext} from './components/Firebase/index'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <FirebaseContext.Provider value={new Firebase()}>
     <BrowserRouter>
      <App />
     </BrowserRouter>
    </FirebaseContext.Provider>
)
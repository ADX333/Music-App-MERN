import {Routes,Route} from 'react-router-dom'
import Login from './components/Auth/Login'

export default function App(){
  return (
    <Routes>
      <Route path='/' element={<Login></Login>} />
    </Routes>
  )
}
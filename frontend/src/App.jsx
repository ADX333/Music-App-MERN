import {Routes,Route} from 'react-router-dom'
import Login from './components/Auth/Login'
import Home from './pages/Home'


export default function App(){
  return (
    <Routes>
      <Route path='/' element={<Login></Login>} />
      <Route path='/home' element={<Home></Home>}/>
    </Routes>
  )
}
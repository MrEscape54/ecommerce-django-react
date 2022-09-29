import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './containers/Home'
import Error404 from './containers/errors/Error404'
import Signup from './features/auth/Signup'
import Activate from './features/auth/Activate'
import Login from './features/auth/Login'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/* Error display */}
        <Route path="*" element={<Error404 />} />

        <Route exact path='/' element={<Home />} />

        {/* Authentication */}
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/registration/account-confirm-email/:key' element={<Activate />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

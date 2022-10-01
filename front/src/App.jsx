import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './containers/Home'
import Error404 from './containers/errors/Error404'
import Signup from './features/auth/Signup'
import Activate from './features/auth/Activate'
import Login from './features/auth/Login'
import PasswordReset from './features/auth/PasswordReset'
import PasswordResetConfirm from './features/auth/PasswordResetConfirm'
import PasswordChange from './features/auth/PasswordChange'

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
        <Route exact path='/password-reset' element={<PasswordReset />} />
        <Route exact path='/password-reset/confirm/:uid/:token' element={<PasswordResetConfirm />} />
        <Route exact path='/password-change' element={<PasswordChange />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App

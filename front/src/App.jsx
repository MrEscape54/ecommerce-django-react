import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './containers/Home'
import Error404 from './containers/errors/Error404'
import Signup from './features/auth/Signup'
import Activate from './features/auth/Activate'
import Login from './features/auth/Login'
import PasswordReset from './features/auth/PasswordReset'
import PasswordResetConfirm from './features/auth/PasswordResetConfirm'
import PasswordChange from './features/auth/PasswordChange'

const contextClass = {
  success: "bg-green-100 text-green-600",
  error: "bg-red-100 text-red-600",
  info: "bg-gray-100 text-gray-600",
  warning: "bg-orange-100 text-orange-600",
  default: "bg-indigo-100 text-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

const App = () => {

  return (
    <BrowserRouter>
      <ToastContainer
        className="w-fit"
        toastClassName={({ type }) => contextClass[type || "default"] +
          " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        }
        position="top-center"
        hideProgressBar
        autoClose={3000}
      />
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

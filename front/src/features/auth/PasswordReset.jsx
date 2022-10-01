import axios from 'axios'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThreeDots } from 'react-loader-spinner'
import Layout from '../../components/hocs/Layout'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_URL

export const passwordResetAPI = createAsyncThunk(
  'auth/passwordReset',
  async ({ email }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify({ email });

      const res = await axios.post(`${API_URL}/auth/password/reset/`, body, config)

      return res.data.detail

    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      }
      return rejectWithValue({ 'Network_Error': error.message })
    }
  }
)

const PasswordReset = () => {

  const errors = useSelector(state => state.auth.error)
  const success = useSelector(state => state.auth.success)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const loading = useSelector(state => state.auth.loading)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated)
      navigate('/', { replace: true });
  }, [isAuthenticated])


  const [formData, setFormData] = useState({ email: "" })
  const { email } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault()
    dispatch(passwordResetAPI({ email: email.toLowerCase() }))
    window.scrollTo(0, 0);
  }

  return (
    <Layout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your Password</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {success
              ?
              <div className='p-1.5 my-1.5 rounded-md text-sm font-medium bg-green-50 text-green-600' >
                {success} <b>Please check your inbox.</b>
              </div>
              : null
            }
            {errors && errors.hasOwnProperty('Network_Error')
              ?
              <div className='p-1.5 my-1.5 rounded-md text-[0.75em] bg-red-50 text-red-600' >
                {errors.Network_Error}. Try again later
              </div>
              :
              null
            }
            <form onSubmit={e => onSubmit(e)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    type="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {errors && errors.hasOwnProperty('email')
                  ?
                  <ul className='p-1.5 mt-1.5 rounded-md text-[0.75em] bg-red-50'>
                    {errors.email.map((error, i) => <li className='text-red-600' key={i}>{error}</li>)}
                  </ul>
                  : null
                }
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 max-h-11 hover:bg-indigo-700"
                >
                  {loading ? <ThreeDots color="#FFF" width={25} height={25} /> : 'Reset Password'}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </Layout >
  )
}

export default PasswordReset

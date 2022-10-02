import axios from 'axios'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThreeDots } from 'react-loader-spinner'
import Layout from '../../components/hocs/Layout'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_URL

export const passwordChangeAPI = createAsyncThunk(
  'auth/passwordChange',
  async ({ old_password, new_password1, new_password2 }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${localStorage.getItem('access')}`
        }
      };
      const body = JSON.stringify({ old_password, new_password1, new_password2 });

      const res = await axios.post(`${API_URL}/auth/password/change/`, body, config)
      return res.data.detail

    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      }
      return rejectWithValue({ 'Network_Error': error.message })
    }
  }
)

const PasswordChange = () => {

  const { error, success, loading, access } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!access)
      navigate('/login');
    if (success) {
      setFormData({ old_password: "", new_password1: "", new_password2: "" })
      navigate('/login');
    }
  }, [access, success])


  const [formData, setFormData] = useState({ old_password: "", new_password1: "", new_password2: "" })
  const { old_password, new_password1, new_password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault()
    dispatch(passwordChangeAPI({ old_password: old_password, new_password1: new_password1, new_password2: new_password2 }))
    window.scrollTo(0, 0);
  }

  return (
    <Layout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Change your Password</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && error.hasOwnProperty('Network_Error')
              ?
              <div className='p-1.5 my-1.5 rounded-md text-[0.75em] bg-red-50 text-red-600' >
                {error.Network_Error}. Try again later
              </div>
              :
              null
            }
            <form onSubmit={e => onSubmit(e)} className="space-y-6">
              <div>
                <label htmlFor="old_password" className="block text-sm font-medium text-gray-700">
                  Old Password
                </label>
                <div className="mt-1">
                  <input
                    name="old_password"
                    value={old_password}
                    onChange={e => onChange(e)}
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {error && error.hasOwnProperty('old_password')
                  ?
                  <ul className='p-1.5 mt-1.5 rounded-md text-[0.75em] bg-red-50'>
                    {error.old_password.map((error, i) => <li className='text-red-600' key={i}>{error}</li>)}
                  </ul>
                  : null
                }
              </div>

              <div>
                <label htmlFor="new_password1" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    name="new_password1"
                    value={new_password1}
                    onChange={e => onChange(e)}
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {error && error.hasOwnProperty('new_password2')
                  ?
                  <ul className='p-1.5 mt-1.5 rounded-md text-[0.75em] bg-red-50'>
                    {error.new_password2.map((error, i) => <li className='text-red-600' key={i}>{error}</li>)}
                  </ul>
                  : null
                }
              </div>

              <div>
                <label htmlFor="new_password2" className="block text-sm font-medium text-gray-700">
                  Repeat New Password
                </label>
                <div className="mt-1">
                  <input
                    name="new_password2"
                    value={new_password2}
                    onChange={e => onChange(e)}
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 max-h-11 hover:bg-indigo-700"
                >
                  {loading ? <ThreeDots color="#FFF" width={25} height={25} /> : 'Change Password'}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </Layout >
  )
}

export default PasswordChange

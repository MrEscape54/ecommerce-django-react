import axios from 'axios'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL

export const activationAPI = createAsyncThunk(
  'auth/verifyEmail',
  async ({ key }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify({ key });

      await axios.post(`${API_URL}/registration/verify-email/`, body, config)
      return 'Your email has been successfully verified'

    } catch (error) {
      if (error.response.data)
        return rejectWithValue('Your email could not be verified')
      return rejectWithValue('Network Error')
    }
  }
)


const message = [
  {
    info: 'error',
    icon: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  },
  {
    info: 'success',
    icon: <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  },
]

const Activate = () => {

  const errors = useSelector(state => state.auth.error)
  const success = useSelector(state => state.auth.success)
  const loading = useSelector(state => state.auth.loading)
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const key = params.key

  useEffect(() => {
    dispatch(activationAPI({ key: key }))
  }, [])

  const [counter, setCounter] = useState(5)

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setCounter(counter - 1)
      }, 1000)
    }
    if (counter === 0)
      navigate('/login', { replace: true });
  }, [success, counter])

  return (
    <div className={`flex h-screen text-white 
    ${success ? 'bg-green-800' : errors ? 'bg-red-800' : 'bg-slate-200'}`}>
      <div
        className={`p-10 w-1/2 mx-auto text-center flex flex-col items-center self-center 
        ${success ? 'bg-green-600' : errors ? 'bg-red-600' : null}`}>
        <p className='mb-5 text-2xl font-bold'>{errors ? errors : success}</p>
        {loading ? <ThreeDots color="#FFF" width={80} height={80} />
          : errors ? message.find(msg => msg.info === 'error').icon
            : success ? message.find(msg => msg.info === 'success').icon : null}
        <p className='mt-5 text-lg font-bold'>
          {errors === 'Network Error'
            ? 'Plase try again later' : success
              ? 'You can now ' : errors ? 'The activation key provided is not valid' : null}
          {success ? <Link className='underline' to='/login'>login</Link> : null}
        </p>
        <p className='mb-3'>{success ? 'You will be redirected to the login page in: ' : null}
          <span>{success ? counter : null}</span>
        </p>
      </div>
    </div>
  )
}

export default Activate
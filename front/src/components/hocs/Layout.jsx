import axios from 'axios'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';

const API_URL = import.meta.env.VITE_API_URL

export const refreshAPI = createAsyncThunk(
  'auth/refresh',
  async ({ refresh }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify({ refresh });

      const { data } = await axios.post(`${API_URL}/auth/token/refresh/`, body, config)
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
      return data

    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      }
      return rejectWithValue({ 'Network_Error': error.message })
    }
  }
)

export const verifyAPI = createAsyncThunk(
  'auth/verify',
  async ({ token }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify({ token });

      await axios.post(`${API_URL}/auth/token/verify/`, body, config)

    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      }
      return rejectWithValue({ 'Network_Error': error.message })
    }
  }
)

export const loadUserAPI = createAsyncThunk(
  'auth/loadUser',
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${localStorage.getItem('access')}`
        }
      };

      const res = await axios.get(`${API_URL}/auth/user/`, config)
      return res.data

    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      }
      return rejectWithValue({ 'Network_Error': error.message })
    }
  }
)


const Layout = ({ children }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('access')) {
      const refresh = localStorage.getItem('refresh')
      const access = localStorage.getItem('access')
      dispatch(refreshAPI({ 'refresh': refresh }))
      dispatch(verifyAPI({ 'token': access }))
      dispatch(loadUserAPI())
    }
  }, [])

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify'

import { signupAPI } from "./Signup";
import { activationAPI } from "./Activate";
import { loginAPI } from "./Login"
import { passwordResetAPI } from "./PasswordReset";
import { passwordResetConfirmAPI } from "./PasswordResetConfirm";
import { passwordChangeAPI } from "./PasswordChange";
import { refreshAPI, verifyAPI, loadUserAPI } from "../../components/hocs/Layout";

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  error: null,
  success: null,
  isAuthenticated: false,
  user: null,
  loading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      state.access = null
      state.refresh = null
      state.error = null
      state.success = null
      state.isAuthenticated = false
      state.user = null
      state.loading = false
    },
  },
  extraReducers: builder => {
    /* Signup */
    builder.addCase(signupAPI.pending, state => {
      state.loading = true
      state.success = null
      state.error = null
    }),
      builder.addCase(signupAPI.fulfilled, (state, { payload }) => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        state.access = null
        state.refresh = null
        state.user = null
        state.success = payload
        state.loading = false
      }),
      builder.addCase(signupAPI.rejected, (state, { payload }) => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        state.access = null
        state.refresh = null
        state.user = null
        state.error = payload
        state.loading = false
      }),

      /* Verify Email */
      builder.addCase(activationAPI.pending, state => {
        state.loading = true
        state.success = null
        state.error = null
      }),
      builder.addCase(activationAPI.fulfilled, (state, { payload }) => {
        state.access = null
        state.refresh = null
        state.user = null
        state.success = payload
        state.loading = false
      }),
      builder.addCase(activationAPI.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      }),

      /* Login */
      builder.addCase(loginAPI.pending, state => {
        state.loading = true
        state.success = null
        state.error = null
      }),
      builder.addCase(loginAPI.fulfilled, state => {
        state.access = localStorage.getItem('access')
        state.refresh = localStorage.getItem('refresh')
        state.loading = false
        state.isAuthenticated = true
      }),
      builder.addCase(loginAPI.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      }),

      /* Refresh */
      builder.addCase(refreshAPI.pending, state => {
        state.loading = true
        state.success = null
        state.error = null
      }),
      builder.addCase(refreshAPI.fulfilled, state => {
        state.access = localStorage.getItem('access')
        state.refresh = localStorage.getItem('refresh')
        state.loading = false
      }),
      builder.addCase(refreshAPI.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      }),

      /* Verify */
      builder.addCase(verifyAPI.pending, state => {
        state.loading = true
        state.success = null
        state.error = null
      }),
      builder.addCase(verifyAPI.fulfilled, state => {
        state.isAuthenticated = true
        state.loading = false
      }),
      builder.addCase(verifyAPI.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      }),

      /* Load User */
      builder.addCase(loadUserAPI.pending, state => {
        state.loading = true
        state.success = null
        state.error = null
      }),
      builder.addCase(loadUserAPI.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload
      }),
      builder.addCase(loadUserAPI.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      }),

      /* Password Reset */
      builder.addCase(passwordResetAPI.pending, state => {
        state.loading = true
        state.success = null
        state.error = null
      }),
      builder.addCase(passwordResetAPI.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = payload
        toast.info(`${payload}. Please, check your inbox`)
      }),
      builder.addCase(passwordResetAPI.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      }),

      /* Password Reset Confirm*/
      builder.addCase(passwordResetConfirmAPI.pending, state => {
        state.loading = true
        state.success = null
        state.error = null
      }),
      builder.addCase(passwordResetConfirmAPI.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = payload
        toast.success(payload)
      }),
      builder.addCase(passwordResetConfirmAPI.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      }),

      /* Password Change*/
      builder.addCase(passwordChangeAPI.pending, state => {
        state.loading = true
        state.success = null
        state.error = null
      }),
      builder.addCase(passwordChangeAPI.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = payload
        toast.success(payload)
      }),
      builder.addCase(passwordChangeAPI.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
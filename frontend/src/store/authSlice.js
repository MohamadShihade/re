import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    autherized: true,
    authentaicated: false,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
            localStorage.setItem('token', JSON.stringify(accessToken));

        },
        logOut: (state, action) => {
            state.token = null
            localStorage.clear();

        },
        setAutherized: (state, action) =>{
            state.autherized = action.payload;
        }
    }
})

export const { setCredentials, logOut ,setAutherized } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
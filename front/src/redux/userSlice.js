import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        fullname: '',
        email: '',
        isverified: 0,
        bio: '',
        photoProfile: '',
        token: '',
        content: []
    },
    reducers: {
        login: (state, action) => {
            console.log(action.payload)
            state.username = action.payload.username
            state.fullname = action.payload.fullname
            state.email = action.payload.email
            state.isverified = action.payload.isverified
            state.bio = action.payload.bio
            state.photoProfile = action.payload.photoProfile
            state.token = action.payload.token
        },
        updateProfile: (state, action) => {
            state.username = action.payload.username
            state.fullname = action.payload.fullname
            state.email = action.payload.email
            state.isverified = action.payload.isverified
            state.bio = action.payload.bio
            state.photoProfile = action.payload.photoProfile
        },
        content: (state, action) => {
            state.content = [action.payload.data, ...state.content]
        },
        logout: (state, action) => {
            state.username = ''
            state.fullname = ''
            state.email = ''
            state.isverified = ''
            state.bio = ''
            state.photoProfile = ''
            state.content = []
        },
        deleteContent: (state, action) => {
            state.content.splice(state.content.findIndex(a => a.id_content === action.payload.id), 1)
        }
    }
})

export const { login, updateProfile, content, deleteContent, logout } = userSlice.actions
export default userSlice.reducer;
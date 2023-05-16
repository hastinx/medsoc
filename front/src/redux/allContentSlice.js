import { createSlice } from "@reduxjs/toolkit";

const allContentSlice = createSlice({
    name: 'allcontent',
    initialState: {
        content: [],
    },
    reducers: {
        add: (state, action) => {
            console.log(action.payload)
            state.content = [action.payload.data, ...state.content]
        },
        clear: (state, action) => {
            state.content = []
        }
    }
})

export const { add, clear } = allContentSlice.actions
export default allContentSlice.reducer;
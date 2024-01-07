import { createSlice } from '@reduxjs/toolkit'

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: [],
        page: 0
    },
    reducers: {
        setData: (state, action) => {
            state.data = [...state.data, ...action.payload]
        },
        incrementPage: (state) => {
            state.page += 1
        },
    },
})

export const { setData, incrementPage } = postsSlice.actions

export default postsSlice.reducer
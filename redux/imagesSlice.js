import { createSlice } from "@reduxjs/toolkit";

export const imagesSlice = createSlice({
    name: 'images',
    initialState: {
        list: [],
        detailImg: [],
    },
    reducers: {
        currentImages: (state, action) => {
            state.list = action.payload
        },
        deleteImages: (state, action) => {
            const id = action.payload
            const listNew = state.list.filter((e) => { return (e.id != action.payload) })
            state.list = listNew
        },
        detailImg: (state, action) => {
            state.detailImg = action.payload
        },
        resetDetailImg: (state, action) => {
            state.detailImg = []
        }

    }
})

export const {
    currentImages,
    deleteImages,
    detailImg,
    resetDetailImg
} = imagesSlice.actions

export default imagesSlice.reducer


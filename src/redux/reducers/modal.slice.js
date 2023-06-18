import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    text: '',
    onClose: () => {},
    onRemove: () => {},
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true
            state.text = action.payload.text
            state.onClose = action.payload.onClose
            state.onRemove = action.payload.onRemove
        },
        closeModal: (state, action) => {
            state.isOpen = false
            state.text = ''
            state.onClose = () => {}
            state.onRemove = () => {}
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions
export default modalSlice.reducer